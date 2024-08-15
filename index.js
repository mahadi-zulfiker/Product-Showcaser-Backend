require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// middlewires
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.URI).then(() => console.log("Connected to DB!"))

app.listen(port, () => {
    console.log("running at", port);
})

