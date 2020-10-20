const accountSid = 'ACe5225aaf929103ff37ccf627c00642b5';
const authToken = 'efedbc49a59307b60c44ac002fbe3eb0';


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
    console.log('***error delivering message***');
    res.send("cannot deliver message");
  });
}

module.exports = { sendSMS };
