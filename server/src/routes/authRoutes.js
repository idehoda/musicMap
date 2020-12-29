const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('email and password required')
        }
        const newUser = new User({ email, password });
        const savedUser = await newUser.save();
        const token = jwt.sign({ userId: savedUser._id }, 'keeeey')
        res.json({ token })
    } catch (error) {
        console.log('signup post router error', error)
        res.status(500).send('something went wrong')
    }
   
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('email and password required')
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(404).send('Invalid password or email')
    }
    const match = await foundUser.comparePassword(password);
    if (!match) {
        return res.status(404).send('Invalid password or email')
    }
    const token = jwt.sign({ userId: foundUser._id }, 'keeeey');
    res.json({ token })
})

module.exports = router;