const mongoose = require('mongoose');
const { Schema } = mongoose;

// same as table in MySql what a note will  have like: it's title, description tag and timestamp(this how a note will look like)
// user :- notes is accociated with which user 
const NotesSchema = new Schema({
    user: {
        // same as a foreign key in sql or mySQL
        type: mongoose.Schema.Types.ObjectId,// which user is linked to this note
        ref: 'user', // user is comming from the user.js model
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
// table will be by name of notes
module.exports = mongoose.model('notes', NotesSchema); // to export the schema to use 

// in table notes 
// _id is the note id
// user will be the id of the user 