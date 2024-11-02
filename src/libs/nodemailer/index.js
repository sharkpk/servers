const { reject } = require("bcrypt/promises");
const nodemailer = require("nodemailer");
const SENDER_ACCOUNT_EMAIL = process.env.SENDER_ACCOUNT_EMAIL;
const SENDER_ACCOUNT_PASSWORD = process.env.SENDER_ACCOUNT_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_ACCOUNT_EMAIL,
    pass: SENDER_ACCOUNT_PASSWORD,
  },
});

// Send the email

const send_email = async (
  to,
  subject = "Subject",
  text = "Testing Email",
  html = "<h1>Testing Email</h1>"
) => {
  // Email options
  const mailOptions = {
    from: SENDER_ACCOUNT_EMAIL,
    to,
    subject,
    text,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject({ error: true, data: {}, message: error });
        return;
      }
      resolve({ data: info.response, error: false, message: "OTP Sent" });
    });
  });
};
module.exports = { send_email };
