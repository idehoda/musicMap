const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    const user = this;
    if (!this.isModified('password')) {
        return next;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next()
})

userSchema.methods.comparePassword = async function(passedPassword) {
    try {
        const user = this;
        const isMatch = await bcrypt.compare(passedPassword, user.password);
        return isMatch;
    } catch (error) {
        console.log('password compare error', error)
        return false;
    }
}

mongoose.model('User', userSchema);