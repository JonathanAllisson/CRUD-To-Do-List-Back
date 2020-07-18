const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const tasks = await connection('tasks').select('*');
    return res.json(tasks);
  },

  async create(req, res) {
    try {
      const { title, description, icon } = req.body;
      const task = await connection('tasks').insert({
        title,
        description,
        icon,
        user_id: req.userId,
      });
      return res.json(task);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { title, description, icon, idTask } = req.body;
      const task = await connection('tasks').where({ id: idTask }).update({
        title,
        description,
        icon,
      });
      return res.json({ task });
    } catch (err) {
      return res.json({ message: err.message });
    }
  },
};
