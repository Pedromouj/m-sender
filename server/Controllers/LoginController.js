const { checkUserIfExist } = require("../model/LoginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class LoginController {
  async AuthenticateUser(req, res) {
    try {
      const { email, password } = req.body;
      const data = await checkUserIfExist(email, password);
      const user = data[0];
      bcrypt.compare(password, user.password, async (bcryptErr, match) => {
        if (bcryptErr) {
          console.error("Error comparing passwords:", bcryptErr);
          res.status(500).json({ error: "Authentication error" });
          return;
        }
        if (password !== user.password) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        const token = await jwt.sign(
          {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            nom_complet: user.nom + " " + user.prenom,
            status: user.status,
          },
          "Mojave123",
          { expiresIn: "1h" }
        );
        res.json({
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            status: user.status,
            nom_complet: user.nom + " " + user.prenom,
          },
          token: token,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }
}

module.exports = new LoginController();
