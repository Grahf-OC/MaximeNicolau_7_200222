const Message = require('../models/Message');
const fs = require('fs');


exports.getAllMessages = async (req, res) => { 
    try {
    const messages = await Message.findAll();
    res.status(200).json(messages);}
    catch(error) {
        res.status(400).json({
            error: error,
        })

    }
};