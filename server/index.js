const express = require("express");
const { createTransport } = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AuthenticateUser } = require("./Controllers/LoginController");
const {
  RegisterController,
  activateEmail,
} = require("./Controllers/RegisterController");
const {
  insertServer,
  showAllServersCon,
  showPasswordCon,
  ActivateServerController,
  getActivateController,
  updateServerController,
  deleteServerController,
} = require("./Controllers/ServerController");
const {
  updateSetting,
  allUsers,
  updateUserpass,
} = require("./Controllers/SettingController");
const app = express();
const port = 3001; // Change this to your desired port

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cors()); // Add this line to enable CORS
app.post("/login", AuthenticateUser);
app.post("/register", RegisterController);
app.post("/server-insert", insertServer);
app.post("/server/activate", ActivateServerController);
app.get("/server/activate/:iduser", getActivateController);
app.get("/servers/:id", showAllServersCon);
app.post("/showpass", showPasswordCon);
app.put("/update/user", updateSetting);
app.put("/password/update", updateUserpass);
app.put("/delete/server", deleteServerController);
app.get("/user/:id", allUsers);
app.put("/update/server", updateServerController);
app.get("/activate/:token", activateEmail);

const messages = [];
app.post("/send-emails", async (req, res) => {
  const { recipientsName, user, pass, host, recipients, subject, Content } =
    req.body;
  const transporter = createTransport({
    host,
    port: 587,
    secure: false, // You may set this to true if your server supports TLS
    auth: {
      user: user,
      pass: pass,
    },
  });

  const sendEmailsInBatches = async (
    recipients,
    batchSize,
    batchDelay,
    callback
  ) => {
    let sentCount = 0;
    try {
      for (let i = 0; i < recipients.length; i += batchSize) {
        const batchRecipients = recipients.slice(i, i + batchSize);
        const emailPromises = batchRecipients.map(async (recipient) => {
          const mailOptions = {
            from: `${recipientsName} <${recipients}>`,
            to: recipient,
            subject: subject,
            html: Content,
            connectionTimeout: 10000, // Adjust timeout value as needed
            // attachments: imagePaths.map((imagePath, index) => ({
            //   filename: `image${index + 1}.jpg`,
            //   path: imagePath,
            //   cid: `Visuel${index + 1}`,
            //   contentDisposition: "inline",
            //   contentType: "image/jpeg",
            // })),
          };

          try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${recipient}`);
            sentCount++;
          } catch (error) {
            console.error(
              `Error sending email to ${recipient}: ${error.message}`
            );
            messages.push({
              error: `Error sending email to ${recipient} in the server "${host}" is not found`,
            });
          }
        });

        await Promise.all(emailPromises);

        if (i + batchSize < recipients.length) {
          await new Promise((resolve) => setTimeout(resolve, batchDelay));
        }
      }
    } catch (error) {
      console.error(`Error sending batch of emails: ${error.message}`);
      // res.status(500).send("Failed to send emails");
      return;
    }

    console.log(`Sent ${sentCount} out of ${recipients.length} emails.`);
    if (sentCount > 0) {
      res.status(200).send({
        success: `All emails sent successfully: ${sentCount} out of ${recipients.length} emails.`,
      });
    } else {
      res.status(200).send({
        error: `Error sending emails in the server "${user}" is not found`,
      });
    }
  };

  const batchSize = 1; // Modify batch size if needed
  const batchDelay = 3000; // Modify batch delay if needed
  await sendEmailsInBatches(recipients, batchSize, batchDelay);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
