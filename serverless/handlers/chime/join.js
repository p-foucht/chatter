const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
const chime = new AWS.Chime({ region: 'us-east-1' });
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

const MEETINGS_TABLE = process.env.MEETINGS_TABLE;

module.exports.join = async (event, context) => {
  const query = event.queryStringParameters;

  console.log('event: ', JSON.stringify(event));

  if (!query.title || !query.name || !query.region) {
    console.log('Missing required params. Exiting');
    return response(
      400,
      'application/json',
      JSON.stringify({ error: 'Need parameters: title, name, region' })
    );
  }

  let meeting = await getMeeting(query.title);

  if (!meeting || isEmpty(meeting)) {
    console.log('No existing meetings. Creating a new meeting');

    const request = {
      ClientRequestToken: uuid(),
      MediaRegion: query.region,
      // ExternalMeetingId: query.title.substring(0, 64),
    };

    console.info('Creating new meeting params: ' + JSON.stringify(request));

    try {
      console.info('Creating new meeting: ' + JSON.stringify(request));
      meeting = await chime.createMeeting(request).promise();
      console.log('Received meeting from chime: ', JSON.stringify(meeting));
      await putMeeting(query.title, meeting);
    } catch (e) {
      console.log('Error creating/saving meeting: ', e.message);
    }
  }

  console.info('Adding new attendee');

  try {
    const attendee = await chime
      .createAttendee({
        MeetingId: meeting.Meeting.MeetingId,
        ExternalUserId: `${uuid().substring(0, 8)}#${query.name}`.substring(
          0,
          64
        ),
      })
      .promise();

    return response(
      200,
      'application/json',
      JSON.stringify(
        {
          JoinInfo: {
            Meeting: meeting,
            Attendee: attendee,
          },
        },
        null,
        2
      )
    );
  } catch (e) {
    console.log('Error creating attendee - ', e.message);
    return response(
      500,
      'application/json',
      JSON.stringify({ error: e.message })
    );
  }
};

async function getMeeting(title) {
  try {
    const result = await ddb
      .get({
        TableName: MEETINGS_TABLE,
        Key: {
          Title: title,
        },
      })
      .promise();

    console.log('getMeeting: ', JSON.stringify(result));

    return isEmpty(meeting) ? null : meeting;
  } catch (e) {
    console.log('Something went wrong getting meeting: ', e.message);
    return null;
  }
}

async function putMeeting(title, meeting) {
  await ddb
    .put({
      TableName: MEETINGS_TABLE,
      Item: {
        Title: title,
        Data: JSON.stringify(meeting),
        TTL: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
    })
    .promise();
}

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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
