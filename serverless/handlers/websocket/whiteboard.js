const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
const CONNECTION_TABLE = process.env.CONNECTIONS_TABLE;

exports.handler = async function (event, context) {
  console.log('Event: ', JSON.stringify(event));
  const { connectionId, domainName, stage } = event.requestContext;
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${domainName}/${stage}`,
  });

  try {
    const params = { TableName: CONNECTION_TABLE };
    const connectionItems = await ddb.scan(params).promise();
    const connections = connectionItems.Items;
    console.log('Connections: ', JSON.stringify(connections));

    const outgoingMessages = connections.map(async (connection) => {
      if (connection.ConnectionId === connectionId) {
        return;
      }

      await postToConnection(
        apigwManagementApi,
        connection.ConnectionId,
        event.body
      );
    });

    console.log('Outgoing messages: ', JSON.stringify(outgoingMessages));
    await Promise.all(outgoingMessages);
    console.log('All messages sent!');
  } catch (e) {
    console.log('Something went wrong getting connections: ', e.message);
  }

  return { statusCode: 200 };
};

const postToConnection = async (postApi, connectionId, message) => {
  try {
    await postApi
      .postToConnection({ ConnectionId: connectionId, Data: message })
      .promise();
    console.log(
      'Successfully posted to connection with connectionId ' + connectionId
    );
    return;
  } catch (e) {
    if (e.statusCode === 410) {
      console.log(`found stale connection, skipping ${connectionId}`);
    } else {
      console.error(
        `error posting to connection ${connectionId}: ${e.message}`
      );
    }
  }
};
