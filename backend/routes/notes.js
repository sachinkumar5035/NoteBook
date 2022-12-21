const express = require('express');
const fetchuser = require('../middleware/fetchuser'); // to user fetchuser middleware
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator'); // for express validator
const { route } = require('./auth');


// route 1: get all notes using GET: /api/notes/fetchallnotes Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        return req.status(500).send({ error: "internal server error" });
    }
})


// Route 2: Add a new note using POST: /api/notes/addnote Login required
router.post('/addnote', fetchuser, [
    body('title', 'Give a valid title').isLength({ min: 5 }),// title must be at least 5 chars long
    body('description', 'Description must be atleat 5 charater long').isLength({ min: 5 }),], // description must be at least 5 chars long
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const note = new Note({ // note will be associated with a user id 
                title,
                description,
                tag,
                user: req.user.id,
            })
            const savedNote = await note.save(); // return a promise with note
            // const notes = await Notes.find({user: req.user.id});
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            return req.status(500).send({ error: "internal server error" });
        }
    })




// Route 3: update a existing note using PUT /api/notes/updatenote Login require
router.put('/updatenote/:id', fetchuser, async (req, res) => { // id will be the id of note 
    const { title, description, tag } = req.body;

    try {
        // create a newNote object
        const newNote = {}; // if title, description or tag is changed or updated then set these properties accordingly
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note associated with the authtoken with the id passed in url 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found"); // if no note found with associated id
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed"); // unauthorised access
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); //find the associated note and update it
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        return req.status(500).send({ error: "internal server error" });
    }
})





// Route 4: delete a existing note using PUT /api/notes/deletenote Login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => { // id will be the id of note 
    const { title, description, tag } = req.body;

    try {
        // find the note associated with the authtoken with the id passed in url 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found"); // if no note found with associated id
        }
        // allow if user owns this note  
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed"); // unauthorised access
        }

        note = await Note.findByIdAndDelete(req.params.id); //find the associated note and update it
        res.json({ "sucess": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        return req.status(500).send({ error: "internal server error" });
    }
})



module.exports = router;