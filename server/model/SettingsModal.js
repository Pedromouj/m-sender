const db = require("../database/db");

class SettingsModal {
  UpdateUser(nom, prenom, email, id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery =
        "UPDATE users set  prenom = ? , nom = ?   , email = ? where id = ?";
      db.query(SqlQuery, [prenom, nom, email, id_user], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  getAllUserModal(id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery = "select * from users where id = ?";
      db.query(SqlQuery, [id_user], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  updatePassModal(password, id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery = "UPDATE users set password = ? where id = ?";
      db.query(SqlQuery, [password, id_user], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = new SettingsModal();
