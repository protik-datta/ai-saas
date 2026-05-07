const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

if (process.env.NODE_ENV !== "production") {
  transporter.verify((error) => {
    if (error) {
      logger.error(`Email server connection failed: ${error.message}`);
    } else {
      logger.info("Email server is ready to send messages");
    }
  });
}

const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Creator Studio" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    logger.info(`Email dispatched → ${to} (messageId: ${info.messageId})`);
    return info;
  } catch (error) {
    logger.error(`Email send failed: ${error.message}`);
    logger.error(`EMAIL_USER set: ${!!process.env.EMAIL_USER}`);
    logger.error(`EMAIL_PASS set: ${!!process.env.EMAIL_PASS}`);
    throw error;
  }
};

module.exports = { sendMail };
