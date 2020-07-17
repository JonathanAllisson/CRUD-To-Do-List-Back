const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const tasks = await connection('tasks').select('*');
    return res.json(tasks);
  },

  async create(req, res) {
    const { title, description, icon } = req.body;
    const task = await connection('tasks').insert({
      title,
      description,
      icon,
      user_id: 1,
    });
    return res.json(task);
  },
};
