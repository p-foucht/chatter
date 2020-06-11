const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const ddb = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
});
const USERS_TABLE = process.env.USERS_TABLE;

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const { username, password } = body;

  console.log(`Username: ${username}, password: ${password}`);

  const params = {
    TableName: USERS_TABLE,
    FilterExpression: "username = :this_username",
    ExpressionAttributeValues: {
      ":this_username": username,
    },
  };

  let user;
  try {
    let users = await ddb.scan(params).promise();
    user = users.Items[0];
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Passwords do not match");
    }
  } catch (e) {
    console.log("Error fetching user: ", e.message);

    return response(401, "application/json", {
      error: e.message,
    });
  }

  console.log("After try catch");

  const token = jwt.sign({ id: user.ID }, "secret");

  return response(
    200,
    "application/json",
    JSON.stringify({
      user,
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
