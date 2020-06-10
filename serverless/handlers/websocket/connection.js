const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

const CONNECTION_TABLE = process.env.CONNECTIONS_TABLE;

exports.handler = async function (event, context) {
  console.log('Event: ', JSON.stringify(event));
  const { routeKey, connectionId } = event.requestContext;

  switch (routeKey) {
    case '$connect': {
      const params = {
        TableName: CONNECTION_TABLE,
        Item: {
          ConnectionId: connectionId,
          ttl: parseInt(Date.now() / 1000 + 3600),
        },
      };

      console.log('$connect prams: ', JSON.stringify(params));
      await ddb.put(params).promise();
      break;
    }

    case '$disconnect': {
      const params = {
        TableName: CONNECTION_TABLE,
        Key: { ConnectionId: connectionId },
      };

      console.log('$disconnect prams: ', JSON.stringify(params));
      await ddb.delete(params).promise();
      break;
    }

    default:
      console.log('Uncaught message type in websocket handler');
  }

  return { statusCode: 200 };
};
