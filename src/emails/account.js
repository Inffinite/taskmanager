const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'louislaizer4@gmail.com',
        subject: 'Account Deletion',
        text: `${name}, you just deleted your account, good ridance!`
    })
}

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'louislaizer4@gmail.com',
        subject: 'Joined successfully',
        text: `Welcome to the app, ${name}. Clap for yourself.`
    })
} 

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
