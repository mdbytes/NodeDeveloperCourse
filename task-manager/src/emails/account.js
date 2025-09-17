const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')

sgMail.setApiKey(keys.sendGridAPI)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'martin@mdbytes.com',
    subject: 'Welcome!',
    text: `Welcome to the Task Manager API, ${name}.  Let me know how you get along with the API.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'martin@mdbytes.com',
    subject: 'Sorry to see you go!',
    text: `Sorry you've decided to leave the Task Manager API, ${name}.  Please feel free to reply to this email with feedback related to the API.  We would love to earn your business back again.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}
