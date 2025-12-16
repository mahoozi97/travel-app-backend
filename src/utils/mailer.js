const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // email provider
  auth: {
    user: "p2tripmailer@gmail.com",
    pass: "jqbh oyqb ozxx wfci" // I think app password
  }
});

const sendNotificationEmail = (subject, message) => {
  const mailOptions = {
    from: "p2tripmailer@gmail.com",
    to: "p2tripmailer@gmail.com",
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendNotificationEmail;