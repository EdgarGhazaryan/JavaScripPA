const express = require('express');

const expressStatic = require('./expressStatic');

require('dotenv').config();

const app = express();

app.use('/static', expressStatic('static'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running...");
});