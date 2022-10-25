const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, token }) => {
  const resetURL = `${process.env.ORIGIN}/reset-password/${token}?email=${email}`;
  const message = `<p>Please reset your password by clicking on the following link: <a href="${resetURL}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello ${name},</h4>
    ${message}`,
  });
};

module.exports = sendResetPasswordEmail;
