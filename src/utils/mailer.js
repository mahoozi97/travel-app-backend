const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // email provider
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const sendNotificationEmail = (subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
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