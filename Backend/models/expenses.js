const mongoose = require("mongoose");

//Create Schema
const userEpenses = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true,
    },
    expenseDate: {
        type: String,
        required: true,
    },
    expenseAmt: {
        type: Number,
    },
},
    { timestamps: true }
);

//Create Model
const expenseData = mongoose.model("expenseData", userEpenses);

module.exports = expenseData;