const { User } = require("./models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const { createPool } = require("mysql2");
require("dotenv").config();

// Mise en place du password validator

const pwSchema = new passwordValidator();

pwSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

exports.signup = (req, res) => {
  if (!pwSchema.validate(req.body.password)) {
    res.status(401).json({
      message:
        "Le mot de passe doit contenir entre 8 et 100 caractères, doit avoir des minuscules et des majuscules, ainsi qu'au moins 2 chiffres et pas d'espace.",
    });
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = User.create({
          name: req.body.name,
          password: hash,
          email: req.body.email,
        });
        res.status(201).json({ message: "User succesfully created" });
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User does not exist!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.delete = async (req, res) => {

  const user = await User.findOne({
    where: { id : req.params.id },
  });

  if (user.id !== req.auth.id) {
    res.status(403).json({ error: "Unauthorized request"});
  } else {
    user.destroy ({
      where: { id: req.params.id },
    }
    )
  }

};

exports.modifyAccount = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (user.id !== req.auth.id) {
    res.status(403).json({ error: "Unauthorized request" });
  } else {
    const user = req.file
      ? {
          ...Json.parse(req.body.user),
          picture: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    await User.update({
      where: { id: req.params.id},
      ...user,
    });

    res
      .status(200)
      .json({ message: "Profil utilisateur modifié !" })
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.modifyPassword = (req, res) => {};
