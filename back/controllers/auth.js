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
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']);

exports.signup = async (req, res) => {
  try {
    if (!pwSchema.validate(req.body.password)) {
      return res.status(401).json({
        message:
          "Le mot de passe doit contenir entre 8 et 100 caractères, doit avoir des minuscules et des majuscules, au moins 1 chifre et pas d'espace.",
      });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      firstName: req.body.firstName,
      password: hash,
      email: req.body.email,
      isAdmin: false,
    });
    return res.status(201).json({
      message: 'User succesfully created',
      user,
      userId: user.id,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
        expiresIn: '24h',
      }),
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist!' });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    return res.status(200).json({
      message: 'Login success',
      user,
      userId: user.id,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN, {
        expiresIn: '24h',
      }),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
