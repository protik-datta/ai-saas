require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const { sendMail } = require("../services/email.service");
const { verifyRegistration } = require("./templates");

(async () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const mail = verifyRegistration({ to: "protikdatta135@gmail.com", otp });

  await sendMail(mail.to, mail.subject, mail.text, mail.html);

  console.log("Mail sent ✅");
})();
