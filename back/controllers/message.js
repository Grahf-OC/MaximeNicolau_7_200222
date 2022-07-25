/* eslint-disable no-console */
const fs = require('fs');
const User = require('../models/User');
const Message = require('../models/Message');
const Like = require('../models/Like');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [{ model: User }, { model: Like }],
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

exports.getOneMessage = async (req, res) => {
  try {
    const message = await Message.findOne({
      where: { id: req.params.id },
      include: [{ model: User }, { model: Like }],
    });
    console.log(message);
    if (!message) {
      return res.status(400).json({ error: "La ressource n'existe pas." });
    }
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
};

// https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/

exports.createMessage = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.auth.userId },
    });

    const userObject = [
      {
        model: User,
        attributes: [
          'id',
          'firstname',
          'lastname',
          'email',
          'picture',
          'birthday',
        ],
      },
    ];

    const newPicture = req.file
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : null;

    const messageObject = JSON.parse(req.body.body);
    const message = await Message.create({
      include: userObject,
      body: messageObject,
      picture: newPicture,
      UserId: user.id,
    });
    console.log(message);

    return res.status(201).json({ message: 'Message successfully created' });
  } catch (error) {
    return res.status(200).json({
      error,
    });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.auth.userId },
    });
    const message = await Message.findOne({
      where: { id: req.params.id },
    });
    if (message.UserId !== req.auth.userId && user.isAdmin === false) {
      return res.status(403).json({ error: 'Unauthorized request' });
    }
    if (req.file) {
      const newPicture = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
      if (message.picture) {
        const filename = message.picture.split('/images')[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) return console.log(error);
          return console.log('image supprimée');
        });
      }
      message.picture = newPicture;
    }

    message.body = JSON.parse(req.body.body);

    await message.save({
      fields: ['body', 'picture'],
    });
    console.log(message);
    return res.status(200).json({ message: 'Message modified' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.auth.userId },
    });
    console.log(user);
    const message = await Message.findOne({
      where: { id: req.params.id },
    });
    if (message.UserId !== req.auth.userId && user.isAdmin === false) {
      return res.status(403).json({ error: 'Unauthorized request' });
    }
    if (!message.picture) {
      await message.destroy();
      return res.status(200).json({ message: 'Message succesfully deleted' });
    }
    const filename = message.picture.split('/images/')[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw Error(err);
      message.destroy();
      return res.status(200).json({ message: 'Message succesfully deleted' });
    }); // return qqch, ou chercher comment utiliser fs en promesse
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.likeMessage = async (req, res) => {
  try {
    const like = await Like.findOne({
      where: { UserId: req.auth.userId, MessageId: req.params.id },
    });
    if (like) {
      await like.destroy();
      return res.status(200).json({ message: 'like supprimé' });
    }
    Like.create({
      UserId: req.auth.userId,
      MessageId: req.params.id,
    });
    return res.status(201).json({ message: 'message liké' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Ajouter controller trouver tous les messages d'un user.
