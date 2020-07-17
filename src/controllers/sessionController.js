const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

const generateAuthToken = function (user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY
  );
  return token;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await connection('Users').where({ email });
    if (!user || (user && user.length === 0)) {
      return res.status(404).json({ message: 'Your account is not correct' });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res
        .status(404)
        .json({ message: 'Your password is not corrected!' });
    }

    const token = generateAuthToken(user[0]);

    const data = {
      id: user[0].id,
      email,
      token,
    };

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: `${JSON.stringify(err)}` });
  }
};

module.exports = { login };
