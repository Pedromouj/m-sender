const db = require("../database/db");

class HistoryModal {
  ModalHistory(user_id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM history where id_user = ? ";
      db.query(query, [user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  ModalCreateHistory(email, date_history, user_id) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO history(email , date_history , id_user ) VALUES(? , ? , ?)";
      db.query(query, [email, date_history, user_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = new HistoryModal();
