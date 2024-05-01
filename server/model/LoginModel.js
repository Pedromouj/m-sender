const db = require("../database/db");

class LoginModel {
  checkUserIfExist(email, password) {
    return new Promise((resolve, reject) => {
      const Query =
        "SELECT * FROM users WHERE email like ? and password like ?";
      db.query(Query, [email, password], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = new LoginModel();
