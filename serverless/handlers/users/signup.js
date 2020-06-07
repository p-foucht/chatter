const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
const USERS_TABLE = process.env.USERS_TABLE;

module.exports.handler = async (event, context) => {
  console.log('event: ', JSON.stringify(event));

  const body = JSON.parse(event.body);
  const { name, password } = body;

  console.log(`Name: ${name}, password: ${password}`);

  const params = {
    TableName: USERS_TABLE,
    Item: {
      ID: uuid(),
      name,
      password,
    },
  };

  console.log('Writing params to DB: ', JSON.stringify(params));

  try {
    await ddb.put(params).promise();
    console.log('User saved to DB');
  } catch (e) {
    console.log('Error saving user to database: ', e.message);
    return { statusCode: 500 };
  }

  return response(200, 'application/json', JSON.stringify({}));
};

function response(statusCode, contentType, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: body,
    isBase64Encoded: false,
  };
}
