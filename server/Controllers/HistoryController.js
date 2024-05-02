const { ModalHistory, ModalCreateHistory } = require("../model/HistoryModal");

class HistoryController {
  async showAllHistory(req, res) {
    try {
      const { user_id } = req.params;
      const data = await ModalHistory(user_id);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async createHistory(req, res) {
    try {
      const { email, date_history, id_user } = req.body;
      await ModalCreateHistory(email, date_history, id_user);
      res.json({ message: "History inserted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }
}

module.exports = new HistoryController();
