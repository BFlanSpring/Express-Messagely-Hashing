const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const isValidUser = await User.authenticate(username, password);

        if (isValidUser){
            const token = jwt.sign({ username }, process.env.JWT_SECRET);
            await User.updateLoginTimestamp(username);

            return res.json({ token });
        } else {
            return res.status(401).json({message: 'invalid credentials'});
        }
    } catch (err) {
        return next(err);
    }
});

router.post('/register', async (req, res, next) =>{
    try {
        const { username, password, first_name, last_name, phone} = req.body;

        const newUser = await User.register({
            username,
            password,
            first_name,
            last_name,
            phone
        });

        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        await User.updateLoginTimestamp(username); // Fix the typo here: Replace User/User with User.updateLoginTimestamp

        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
