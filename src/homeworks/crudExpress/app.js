const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api', require('./routes/userRouter'));

app.use(require('./routes/errorHandler'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running");
});