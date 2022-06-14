/* eslint-disable no-console */
const fs = require('fs');
const User = require('../models/User');
const Message = require('../models/Message');
const Comment = require('../models/Comment');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ include: User });
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
      include: User,
    });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
};

// https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/

exports.createMessage = async (req, res) => {
  try {
    const messageObject = req.file
      ? {
          ...JSON.parse(req.body.message),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

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
      {
        model: Comment,
        include: [
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
        ],
      },
    ];

    const message = await Message.create({
      include: userObject,
      ...messageObject,
      UserId: user.id,
      likes: 0,
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
    const message = await Message.findOne({
      where: { id: req.params.id },
    });
    if (message.userId !== req.auth.userId) {
      res.status(403).json({ error: 'Unauthorized request' });
    }
    const messageObject = req.file
      ? {
          ...JSON.parse(req.body.message),
          picture: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    await Message.update({
      where: { id: req.params.id },
      ...messageObject,
    });
    return res.status(200).json({ message: 'Message modified' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.deleteMessage = async (req, res) => {
  const message = await Message.findOne({
    where: { id: req.params.id },
  });
  if (message.userId !== req.auth.userId) {
    res.status(400).json({
      error: new Error('Unauthorized request'),
    });
  } else if (message.picture == null) {
    await Message.destroy({
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: 'Message succesfully deleted' })
      .catch((error) => res.status(400).json({ error }));
  } else {
    const filename = message.picture.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Message.destroy({
        where: { id: req.params.id },
      });
      res
        .status(200)
        .json({ message: 'Message succesfully deleted' })
        .catch((error) => res.status(400).json({ error }));
    });
  }
};

/* exports.likeMessage = async (req, res) => {
  if (req.body.like === 1) {
    const incrementLike = await Message.increment(
      'like',
      { by: 1 },

      { where: { id: req.params.id } },
    );
    res
      .status(200)
      .json({ message: 'Message liked' })
      .catch((error) => res.status(400).json({ error }));
  }
};

peut-être Message.update({ like: sequelize.literal('like + 1') },
  { where: { id: req.params.id} }) */

// Ajouter controller trouver tous les messages d'un user.
