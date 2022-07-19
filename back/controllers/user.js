/* eslint-disable no-console */
const fs = require('fs');
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
  const admin = await User.findOne({
    where: { id: req.auth.userId },
  });

  if (user.id !== req.auth.id && admin.isAdmin === false) {
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
    const admin = await User.findOne({
      where: { id: req.auth.userId },
    });

    if (user.id !== req.auth.userId && admin.isAdmin === false) {
      res.status(403).json({ error: 'Unauthorized request' });
    }

    if (req.file) {
      const newPicture = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
      if (user.picture) {
        const filename = user.picture.split('/images')[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) return console.log(error);
          return console.log('image supprimée');
        });
      }
      user.picture = newPicture;
    }
    user.email = JSON.parse(req.body.email);
    user.firstName = JSON.parse(req.body.firstName);
    user.lastName = JSON.parse(req.body.lastName);

    await user.save({
      fields: ['email', 'firstName', 'lastName', 'picture'],
    });

    return res
      .status(200)
      .json({ message: 'Profil utilisateur modifié !', user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.modifyPassword = () => {};
