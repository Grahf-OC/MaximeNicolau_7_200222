const Message = require("../models/Message");
const fs = require("fs");
const User = require("../models/User");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.getOneMessage = async (req, res) => {
  try {
    const message = await Message.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

exports.createMessage = async (req, res) => {
  const messageObject = req.file
    ? {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  console.log(messageObject);
  try {
    const message = await Message.create({
      ...messageObject,
      likes: 0,
    });
    console.log(message);
    res.status(201).json({ message: "Message successfully created" });
  } catch (error) {
    res.status(200).json({
      error: error,
    });
  }
};

exports.modifyMessage = async (req, res) => {
  const message = await Message.findOne({
    where: { id: req.params.id },
  });
  if (message.userId !== req.auth.userId) {
    res.status(403).json({ error: "Unauthorized request" });
  } else {
    const messageObject = req.file
      ? {
          ...JSON.parse(req.body.message),
          picture: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    await Message.update({
      where: { id: req.params.id },
      ...messageObject,
    });
    res
      .status(200)
      .json({ message: "Message modified" })
      .catch((error) => res.status(400).json({ error }));
  }
};
