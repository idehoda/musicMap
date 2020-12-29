require('./models/User');
require('./models/Track');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./middlewares/requireAuth');


app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const { DB_USER, DB_PASS, DB_NAME } = process.env;
const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.tfz0c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', (data) => {
    console.log('connected')
})

mongoose.connection.on('error', (err) => {
    console.error('oops, ', err)
})

app.get('/', auth, (req, res) => {
    res.send(`logged in user ${req.user.email} `)
})

app.listen(3000, () => console.log('-> port 3000'))