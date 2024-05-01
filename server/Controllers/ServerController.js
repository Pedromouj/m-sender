const {
  ServerModal,
  showAllServers,
  showPassword,
  ActivateServer,
  getActivateModal,
  updateServerModal,
  DeleteServerModal,
} = require("../model/ServerModel");

class ServerController {
  async insertServer(req, res) {
    try {
      const { Libelle, host, type, email, password, id_user } = req.body;
      await ServerModal(Libelle, host, type, email, password, id_user);
      res.status(200).send({ message: "Server inserted successfully" });
    } catch (error) {
      res.status(500).send({ error: "There's error in the server " });
      console.error(error);
    }
  }

  async showAllServersCon(req, res) {
    try {
      const { id } = req.params;
      const data = await showAllServers(id);
      res.json(data);
    } catch (error) {
      res.status(500).send({ error: "There's error in the server " });
      console.error(error);
    }
  }

  async showPasswordCon(req, res) {
    try {
      const { password } = req.body;
      const data = await showPassword(password);
      res.json(data);
    } catch (error) {
      res.status(500).send({ error: "There's error in the server " });
      console.error(error);
    }
  }

  async ActivateServerController(req, res) {
    try {
      const { id, id_user } = req.body;
      const data = await ActivateServer(id, id_user);
      res.json(data);
    } catch (error) {
      res.status(500).send({ error: "There's error in the server " });
      console.error(error);
    }
  }

  async getActivateController(req, res) {
    try {
      const { iduser } = req.params;
      const data = await getActivateModal(iduser);
      res.json(data[0]);
    } catch (error) {
      res.status(500).send({ error: "There's error in the server " });
      console.error(error);
    }
  }

  async updateServerController(req, res) {
    try {
      const { Libelle, host, type, email, password, id, id_user } = req.body;
      await updateServerModal(
        Libelle,
        host,
        type,
        email,
        password,
        id,
        id_user
      );
      res.status(200).send({ message: "Server updated successfully" });
    } catch (error) {
      res.status(500).send({ error: "There's error in the server " });
      console.error(error);
    }
  }

  async deleteServerController(req, res) {
    try {
      const { id, id_user } = req.body;
      await DeleteServerModal(id, id_user);
      res.status(200).send({ message: "Server Deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error on the server" });
    }
  }
}

module.exports = new ServerController();
