const Sequelize = require('sequelize');
const sequelize = ('../app');

const messageModel = sequelize.define('mess', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    imageUrl: {
        type: Sequelize.STRING,

    },

    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    usersLiked: {
        type: Sequelize.ARRAY, //NE MARCHE PAS AVEC MYSQL, chercher autre solution
        allowNull: false,
    },


});

module.exports = messageModel;