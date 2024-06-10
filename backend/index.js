require("dotenv").config();

const express = require('express');
const cors = require('cors');

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken  } = require('./utilities');
const Note = require('./models/note.model');

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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).send("Missing required fields");
        return;
    }

    const user = await User.findOne({ email: email });

    if(!user){
        res.status(400).send("User does not exist");
        return;
    }

    if(user.password !== password){
        res.status(400).send("Invalid password");
        return;
    }

    if(user.email === email && user.password === password){
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });

        return res.json({ error: false, user, message:"Logged in Successfully",accessToken });
    }

    else {
        res.status(400).send("Invalid email or password");
    }
})

app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;
    
    const isUser = await User.findOne({ _id: user._id });
    if(!isUser){
        res.status(400).send("User not found");
        return;
    }
    return res.json({
        user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn },
        error: false, user, message: "User fetched successfully"
    });
 })

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const {user} = req.user;

    if(!title || !content) {
        return res.status(400).json({
            error: true,
            message: "Title and content are required",
        });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({ error: false, note, message: "Note added successfully" });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "An error occurred while adding the note",
        });
    }
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags } = req.body;  
    const { user } = req.user;
    
    if(!title && !content && !tags) {
        return res.status(400).json({
            error: true,
            message: "At least one field is required to update",
        });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        // if (isPinned) note.isPinned = isPinned;

        await note.save();
        
       return res.json({ error: false, note, message: "Note updated successfully" });


    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "An error occurred while updating the note",
        });
    }

});

app.get("/get-notes", authenticateToken, async (req, res) => { 
    const { user } = req.user;
    try {
        
        const note = await Note.find({ userId: user._id });
        return res.json({ error: false, note, message: "Notes fetched successfully" });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "An error occurred while fetching notes",
        });
        
    }
})

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if(!note){
            return res.status(400).json({ error: true, message: "Note not found" });
        }

        await note.deleteOne({ _id: noteId, userId: user._id });
        
        return res.json({ error: false, message: "Note deleted successfully", });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "An error occurred while deleting the note",
        });
    }
});

app.put("/update-note-pin-status/:noteId/", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }

       if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({ error: false, note, message: "Note pinned status updated successfully" });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "An error occurred while updating the note's pinned status",
        });
    }
});


app.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;
    
    if(!query){
        return res.status(400).json({ error: true, message: "Query is required" });
    }
    try {

        const matchingNotes = await Note.find({
          userId: user._id,
          $or: [
            { title: { $regex: new RegExp(query, "i") } },
            { content: { $regex: new RegExp(query, "i") } },
          ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes fetched successfully",
        })


    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "An error occurred while fetching notes",
        });
    }
});

app.listen(3000);

module.exports = app;