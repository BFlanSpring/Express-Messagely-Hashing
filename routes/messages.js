const express = require('express');
const jwt = require('jsonwebtoken');
const Message = require('../models/message');
const User = require('../models/user');

const router = express.Router();

// GET /:id - get detail of message.
router.get('/:id', async (req, res, next) => {
    try {
        const messageId = req.params.id;
        const message = await Message.getMessageDetails(messageId);
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        const { from_username, to_username } = message;
        const token = req.headers.authorization.split(' ')[1];
        const { username } = jwt.verify(token, process.env.JWT_SECRET);

        if (username !== from_username && username !== to_username) {
            return res.status(403).json({ message: 'Unauthorized to view this message' });
        }

        return res.json({ message });
    } catch (err) {
        return next(err);
    }
});

// POST / - post message.
router.post('/', async (req, res, next) => {
    try {
        const { to_username, body } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const { username } = jwt.verify(token, process.env.JWT_SECRET);

        const fromUser = await User.get(username);
        const toUser = await User.get(to_username);

        if (!fromUser || !toUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newMessage = await Message.createMessage({
            from_username: fromUser.username,
            to_username: toUser.username,
            body
        });

        return res.status(201).json({ message: newMessage });
    } catch (err) {
        return next(err);
    }
});

// POST /:id/read - mark message as read.
router.post('/:id/read', async (req, res, next) => {
    try {
        const messageId = req.params.id;
        const token = req.headers.authorization.split(' ')[1];
        const { username } = jwt.verify(token, process.env.JWT_SECRET);

        const message = await Message.getMessageDetails(messageId);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        if (message.to_username !== username) {
            return res.status(403).json({ message: 'Unauthorized to mark this message as read' });
        }

        const updatedMessage = await Message.markMessageAsRead(messageId);
        return res.json({ message: updatedMessage });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
