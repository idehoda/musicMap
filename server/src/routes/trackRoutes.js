const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();
router.use(auth);

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id});
    res.send(tracks);
})
router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;
    if (!name || !locations) {
        return res.status(400).send('name and locations required')
    }
    try {
        const track = new Track({ name, locations, userId: req.user._id });
        const savedTrack = await track.save();
        return res.send(track);
    } catch (error) {
        console.log('save track router error', error)
        return res.status(500).send('something went wrong')
    }
})

module.exports = router;