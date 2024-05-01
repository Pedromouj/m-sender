const { sendRegistrationEmail } = require("../model/ActivateMail");
const {
  PricingModel,
  RegisterUser,
  updateCompany,
} = require("../model/RegisterModel");
const jwt = require("jsonwebtoken");
class RegisterController {
  async fetchAllPricing(req, res) {
    try {
      const data = await PricingModel();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's Problem in the server" });
    }
  }

  async RegisterController(req, res) {
    try {
      const { prenom, nom, email, password, status } = req.body;
      await RegisterUser(prenom, nom, email, password, status);

      await sendRegistrationEmail(email, prenom + " " + nom);

      res.status(200).json({ sucess: "Your user inserted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's Problem in the server" });
    }
  }

  async activateEmail(req, res) {
    try {
      const { token } = req.params;
      jwt.verify(token, "emailJJJ", async (err, decoded) => {
        if (err) {
          // Token is invalid or expired
          console.error("Error decoding token:", err);
        } else {
          if (decoded?.email !== "") {
            // Redirect the  user to the /login page
            await updateCompany(decoded?.email);
            res.redirect("http://localhost:5173/login");
          } else {
            // Handle the case where authentication fails
            res.status(401).send("Unauthorized");
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new RegisterController();
