const { User } = require('./models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Mise en place du password validator

const pwSchema = new passwordValidator();

pwSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);

exports.signup = (req, res, next) => {

    if (!pwSchema.validate(req.body.password)) {
        res.status(401).json({ message: "Le mot de passe doit contenir entre 8 et 100 caractères, doit avoir des minuscules et des majuscules, ainsi qu'au moins 2 chiffres et pas d'espace." });
    }

    else {

        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const user = User.create({
                    name: req.body.name,
                    password: hash,
                    email: req.body.email,
                });
                res.status(201).json({ message: 'User succesfully created' });
            })
            .catch((err) => res.status(400).json({ error }));

    }
}

exports.login = (req, res, next) => {

    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'User does not exist!' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Incorrect password' })
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

exports.delete = (req, res, next) => { };

exports.modifyAccount = (req, res, next) => { };



