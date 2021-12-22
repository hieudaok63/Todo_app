const mongoose = require("mongoose"); 


var Todo = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model("Todo", Todo);