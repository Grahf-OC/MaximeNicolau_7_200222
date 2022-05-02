const bcrypt = require('bcrypt');
const PasswordValidator = require('password-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
require('dotenv').config();

// Mise en place du password validator

const pwSchema = new PasswordValidator();

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
  .oneOf(['Passw0rd', 'Password123']);

exports.signup = async (req, res) => {
  try {
    if (!pwSchema.validate(req.body.password)) {
      res.status(401).json({
        message:
          "Le mot de passe doit contenir entre 8 et 100 caractères, doit avoir des minuscules et des majuscules, ainsi qu'au moins 2 chiffres et pas d'espace.",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      password: hash,
      email: req.body.email,
      isAdmin: false,
    });
    return res.status(201).json({
      message: 'User succesfully created',
      userId: user.id,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
        expiresIn: '24h',
      }),
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: 'User does not exist!' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: 'Incorrect password' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
