const AWS = require("aws-sdk");
const {
  v4: uuid
} = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const ddb = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
});
const USERS_TABLE = process.env.USERS_TABLE;

const salt = bcrypt.genSaltSync(10);

module.exports.handler = async (event, context) => {
  console.log("event: ", JSON.stringify(event));

  const body = JSON.parse(event.body);
  const {
    username,
    password,
    email
  } = body;

  const id = uuid();
  const hash = bcrypt.hashSync(password, salt);

  console.log(`Username: ${username}, password: ${hash}`);

  const params = {
    TableName: USERS_TABLE,
    Item: {
      ID: id,
      username,
      email,
      password: hash,
    }
  };

  console.log("Writing params to DB: ", JSON.stringify(params));

  try {
    await ddb.put(params).promise();
    console.log("User saved to DB");
  } catch (e) {
    console.log("Error saving user to database: ", e.message);
    return response(500, "application/json", {
      error: e.message,
    });
  }

  const token = jwt.sign({
    id
  }, "secret");

  return response(
    200,
    "application/json",
    JSON.stringify({
      username,
      token,
    })
  );
};

function response(statusCode, contentType, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: body,
    isBase64Encoded: false,
  };
}