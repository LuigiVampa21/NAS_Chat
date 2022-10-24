const sendEmail = require("./sendEmail");

const sendVerificationEmail = async (
  name,
  email,
) => {
  const message = `<p> Welcome and thank you for choosing NAS-CHAT !</p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4>Hello ${name}</h4> ${message}`,
  });
};

module.exports = sendVerificationEmail;