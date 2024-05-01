const db = require("../database/db");

class RegisterModel {
  PricingModel() {
    return new Promise((resolve, reject) => {
      const Query =
        " SELECT * FROM abenement inner join payment ON abenement.payment_id  =  payment.id ";
      db.query(Query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  RegisterUser(prenom, nom, email, password, status) {
    return new Promise((resolve, reject) => {
      const Query =
        "INSERT INTO users(prenom, nom, email, password, status ) VALUES (? , ? , ? , ? , ? )";
      db.query(Query, [prenom, nom, email, password, status], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  updateCompany(email) {
    return new Promise((resolve, reject) => {
      const sqlQuery = "UPDATE   users  set status = 1  where email like ?";
      db.query(sqlQuery, [email], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  RegisterServer(Libelle, type, email, password, id_user) {
    return new Promise((resolve, reject) => {
      const Query =
        "INSERT INTO server (Libelle , type , email , password , id_user ) VALUES (? , ? , ? , ? , ? , ?)";
      db.query(Query, [Libelle, type, email, password, id_user], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = new RegisterModel();
