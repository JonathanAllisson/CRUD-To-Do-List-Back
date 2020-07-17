const bcrypt = require('bcryptjs');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const users = await connection('users').select('*');
    return res.json(users);
  },

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const replicatedEmail = await connection('users').where('email', email);
      if (replicatedEmail.length > 0) {
        return res.status(401).json({ error: 'Email ja cadastrado' });
      }
      const hash = await bcrypt.hash(password, 10);
      const user = await connection('users').insert({
        name,
        email,
        password: hash,
      });
      return res.json(user);
    } catch (err) {
      return res.json(err.message);
    }
  },
};
