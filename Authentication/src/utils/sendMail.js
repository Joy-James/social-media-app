const { createTransport } = require("nodemailer");
require("dotenv").config();

const {email_config} = require('../config/emailConfig');
const transporter = createTransport(email_config);

async function sendMail( _, full_name) {
  const message_options = {
    from: process.env.EMAIL_USER,
    to: ["joyisvoiced@gmail.com"  ],
    subject: "Welcome to our BUDDEE Community!",
    text: `Dear ${full_name},
    
    We are delighted to welcome you to our BUDDEE community! On behalf of our entire team.
    Should you have any questions or require assistance, please don't hesitate to reach out to our friendly staff.
    We are here to make your experience with us enjoyable and fulfilling.
    Once again, welcome to our BUDDEE family! 
    Happy connecting!`
  };

  try {
    console.log(email_config)
    const info = await transporter.sendMail(message_options);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMail };
