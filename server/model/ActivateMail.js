const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail", // Specify the email service provider here, e.g., 'gmail'
  auth: {
    user: "be349966@gmail.com",
    pass: "eivavhxaiqqsrkxq",
  },
});

// Function to send registration email
const sendRegistrationEmail = async (email, username) => {
  const token = await jwt.sign(
    {
      email: email,
      username: username,
    },
    "JJJK",
    { expiresIn: "1h" }
  );

  const mailOptions = {
    from: "Mojave Team<be349966@gmail.com>",
    to: email,
    subject: "Welcome to Our App!",
    text: `Dear ${username},\n\nThank you for registering on our platform.\n\nBest regards,\nMojave Team\n\nClick the following link to activate your account:\nhttp://localhost:3001/activate/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending registration email:", error);
    } else {
      console.log("Registration email sent:", info.response);
    }
  });
};

module.exports = { sendRegistrationEmail };
