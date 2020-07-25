const jwt = require('jsonwebtoken');
const promisify = require('util');
const connection = require('../database/connection');

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.header('Authorization');
    if (!authorization) {
      return res.status(401).send({
        message: 'Not authorized to do this action',
      });
    }
    const token = authorization.replace('Bearer ', '');
    const data = await promisify(jwt.verify)(token, process.env.JWT_KEY);

    const user = await connection('users').where({ id: data.id });

    if (!user) {
      return res.status(401).send({
        message: 'Not authorized to do this action',
      });
    }

    req.userId = data.id;

    return next();
  } catch (err) {
    return res.status(500).json({ message: `${JSON.stringify(err)}` });
  }
};

module.exports = authMiddleware;
