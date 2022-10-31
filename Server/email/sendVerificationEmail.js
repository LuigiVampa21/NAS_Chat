const sendEmail = require("./sendEmail");

const sendVerificationEmail = async (name, email, verificationToken) => {
  const verifyEmail = `${process.env.ORIGIN_WS}/verify-email/${email}`;

  const message = `<p>Please Confirm your Email by clicking this link: <a href="${verifyEmail}">Verify Email</a> and entering this secret token: ${verificationToken}</p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4>Hello ${name}</h4> ${message}`,
  });
};

module.exports = sendVerificationEmail;
