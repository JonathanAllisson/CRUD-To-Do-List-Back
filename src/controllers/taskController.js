const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const tasks = await connection('tasks')
      .select('*')
      .where({ user_id: req.userId })
      .orderBy('created_at', 'desc');
    return res.status(200).json(tasks);
  },

  async create(req, res) {
    try {
      const { title, description, icon } = req.body;
      const date = new Date();
      const task = await connection('tasks').insert({
        title,
        description,
        icon,
        user_id: req.userId,
        created_at: date,
      });
      return res.status(200).json(task);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { title, description, icon, idTask } = req.body;
      const date = new Date();
      const task = await connection('tasks')
        .where({ user_id: req.userId })
        .andWhere({ id: idTask })
        .update({
          title,
          description,
          icon,
          created_at: date,
        });
      if (task) {
        return res.status(200).json({ message: 'update successfull' });
      }
      return res.status(400).json({ message: 'Not Authorized' });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await connection('tasks').where({ id }).delete();
      return res.status(200).json({ message: 'successfully deleted' });
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },
};
