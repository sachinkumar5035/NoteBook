const mongoose = require('mongoose');
const { Schema } = mongoose;

// same as table in MySql
const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
    }
});


// table will be created by name users
const User = mongoose.model('user',UserSchema);
//User.createIndexes();

module.exports = User; // to export the schema to use