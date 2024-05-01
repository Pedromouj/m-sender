const {
  UpdateUser,
  getAllUserModal,
  updatePassModal,
} = require("../model/SettingsModal");

class SettingController {
  async updateSetting(req, res) {
    try {
      const { nom, prenom, email, id_user } = req.body;
      await UpdateUser(nom, prenom, email, id_user);
      res.json({ success: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error });
    }
  }

  async allUsers(req, res) {
    try {
      const { id } = req.params;
      const data = await getAllUserModal(id);
      res.json(data[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error });
    }
  }

  async updateUserpass(req, res) {
    try {
      const { password1, password2, id_user } = req.body;

      if (password1 === password2) {
        await updatePassModal(password1, id_user);
        res.json({ success: "user updated successfully" });
      } else {
        res.json({
          message:
            "Please ensure that your new password and confirmation match exactly ",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new SettingController();
