require("dotenv").config();

const express = require('express');
const cors = require('cors');

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const app = express();

const jwt = require('jsonwebtoken');
const {authenticationToken } = require('./utilities');

app.use(express.json());

app.use(cors(
    {
        origin: "*",
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/create-account", async (req, res) => { 
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        res.status(400).send("Missing required fields");
        return;
    }

    const isUser = await User.findOne({ email: email });
    if(isUser){
        res.status(400).send("User already exists");
        return;
    }

    const user = new User({
        fullName: fullName,
        email: email,
        password: password,
    }); 

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });   

    return res.json({ error: false, user, message:"Registerd Successfully",accessToken });

})

app.listen(3000);

module.exports = app;