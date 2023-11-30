const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Message = require('../models/message');

const router = express.Router();

// GET / - get list of users.
router.get('/', async (req, res, next) => {
    try {
        const users = await User.getAllUsers();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

// GET /:username - get detail of user.
router.get('/:username', async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.getUser(username);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

// GET /:username/to - get messages to user.
router.get('/:username/to', async (req, res, next) => {
    try {
        const { username } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        const { decodedUsername } = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decodedUsername !== username) {
            return res.status(403).json({ message: 'Unauthorized to view these messages' });
        }

        const messagesToUser = await Message.getMessagesToUser(username);
        return res.json({ messages: messagesToUser });
    } catch (err) {
        return next(err);
    }
});

// GET /:username/from - get messages from user.
router.get('/:username/from', async (req, res, next) => {
    try {
        const { username } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        const { decodedUsername } = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decodedUsername !== username) {
            return res.status(403).json({ message: 'Unauthorized to view these messages' });
        }

        const messagesFromUser = await Message.getMessagesFromUser(username);
        return res.json({ messages: messagesFromUser });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
