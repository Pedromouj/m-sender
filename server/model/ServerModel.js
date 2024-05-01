const db = require("../database/db");

class ServerModel {
  ServerModal(Libelle, host, type, email, password, id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery =
        "INSERT INTO server (Libelle	, host , type , email , password , id_user) values (? , ? , ? , ? , ? , ?)";

      db.query(
        SqlQuery,
        [Libelle, host, type, email, password, id_user],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  showAllServers(id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery =
        "select * from server where  id_user = ? AND status != -1";
      db.query(SqlQuery, [id_user], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  showPassword(password) {
    return new Promise((resolve, reject) => {
      const SqlQuery = "select password from users where  password like ?";
      db.query(SqlQuery, [password], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  ActivateServer(id, id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery =
        "UPDATE server SET status = ? WHERE id = ? AND id_user = ?";
      const SqlQuery2 =
        "UPDATE server SET status = ? WHERE id != ? AND id_user = ?";

      Promise.all([
        new Promise((resolve, reject) => {
          db.query(SqlQuery, [1, id, id_user], (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        }),
        new Promise((resolve, reject) => {
          db.query(SqlQuery2, [0, id, id_user], (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        }),
      ])
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getActivateModal(id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery = "select * from server where status = 1 and  id_user = ?";
      db.query(SqlQuery, [id_user], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  updateServerModal(Libelle, host, type, email, password, id, id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery =
        "update server set Libelle = ? , host = ? , type = ? ,  email = ? , password = ? where id = ? and  id_user = ?";
      db.query(
        SqlQuery,
        [Libelle, host, type, email, password, id, id_user],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  DeleteServerModal(id, id_user) {
    return new Promise((resolve, reject) => {
      const SqlQuery =
        "update server set status = -1  where id = ? and  id_user = ?";
      db.query(SqlQuery, [id, id_user], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = new ServerModel();
