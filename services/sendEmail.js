const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail({ name, email, text }) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
  const emailBody = `<h2>Ви отримали листа </h2>
   <p>вам написав ${name}</p>
   <p>його пошта - ${email}</p>
   <p>${text}</p>`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "ruslan.babkin01@meta.ua", // sender address
    to: "ganzam12@gmail.com", // list of receivers
    subject: "Lorem .......", // Subject line
    text: text, // plain text body
    html: emailBody, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return true;
}

module.exports = {
  sendEmail,
};
