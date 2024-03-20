const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");
const logger = require("../controllers/loggerController");

console.log(smtpUsername,smtpPassword)

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: smtpUsername,
      pass: smtpPassword,
    },
});

const sendEmailWithNodeMailer = async (emailDAta)=> {
    try {
        const emailOptions = {
            from: smtpUsername, // sender address
            to: emailDAta.email, // list of receivers
            subject: emailDAta.subject, // Subject line
            // text: "Hello world?", // plain text body
            html: emailDAta.html, // html body
            }
        
            await transporter.sendMail(emailOptions)
    } catch (error) {
        logger.log("error","Error  ocurred while sending email:",error)
        throw error
    }
}

module.exports = {
    sendEmailWithNodeMailer
}
  