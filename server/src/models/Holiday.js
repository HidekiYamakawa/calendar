const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Holiday = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

mongoose.model('holiday', Holiday);