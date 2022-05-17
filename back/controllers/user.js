const { User } = require('../models/index');
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
};

exports.delete = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (user.id !== req.auth.id) {
    return res.status(403).json({ error: 'Unauthorized request' });
  }
  return user.destroy({
    where: { id: req.params.id },
  });
};

exports.updateAccount = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (user.id !== req.auth.userId) {
      res.status(403).json({ error: 'Unauthorized request' });
    }

    const newUser = req.file
      ? {
          ...JSON.parse(req.body.user),
          picture: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    await user.update(newUser);
    await user.save();

    return res
      .status(200)
      .json({ message: 'Profil utilisateur modifié !', user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.modifyPassword = () => {};
