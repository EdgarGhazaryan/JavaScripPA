const express = require('express');
const mongoose = require('mongoose');

const errorHandlers = require('./middlewares/errorHandlers');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/uploads/images', express.static('uploads/images'));

app.use('/api', require('./routes/authenticationRouter'));

app.use('/api', require('./routes/postRouter'));

app.use('/api', require('./routes/userRouter'));

app.use(errorHandlers.error404);
app.use(errorHandlers.error);

const db = process.env.MongoURI;
const PORT = process.env.PORT || 8000;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected');
        app.listen(PORT, () => {
            console.log("Server is running...");
        });
    })
    .catch(err => console.log(err));