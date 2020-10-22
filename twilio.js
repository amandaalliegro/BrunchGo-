require('dotenv').config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;


// Send SMS message with Twilio
const client = require('twilio')(accountSid, authToken);

const sendSMS = function(phoneNumber, messageBody) {

  client.messages.create({
    to: `+1${phoneNumber}`,
    from: `+16473721872`,
    body: messageBody
  })
  .then(message => console.log(message.sid))
  .catch(error => {
    console.log('***error delivering message***', error);
    res.send("cannot deliver message");
  });
}

module.exports = { sendSMS };
