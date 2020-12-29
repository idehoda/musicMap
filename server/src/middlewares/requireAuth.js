const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (req, res , next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'You must be logged in'})
        }
        const token = authorization.replace('Bearer ', '');
        const payload = await jwt.verify(token, 'keeeey');
        const { userId } = payload; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('user not found')
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('error in auth middleware', error)
        return res.status(500).send('something went wrong')
    }
   
}