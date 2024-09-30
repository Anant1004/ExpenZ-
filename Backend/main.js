const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());  // For parsing application/json
app.use(cors());

const expenseData = require("./models/expenses");

// Routes

// POST route - Add new expense
app.post("/", async (req, res) => {
    const { expenseName, expenseDate, expenseAmt } = req.body;
    try {
        const expenseAdded = await expenseData.create({
            expenseName,
            expenseDate,
            expenseAmt
        });
        res.status(201).json(expenseAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// GET route - Get all expenses
app.get("/", async (req, res) => {
    try {
        const allExpenses = await expenseData.find();
        res.status(200).json(allExpenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE route - Delete an expense by ID
app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await expenseData.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(deletedExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE route - Edit an expense by ID
app.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedExpense = await expenseData.findByIdAndUpdate(id, req.body, {
            new: true,  // Return the updated document
        });

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Mongoose connection
mongoose
    .connect(process.env.URL)
    .then(() => {
        console.log("Connected to MongoDB successfully.");
        app.listen(process.env.PORT || 5000, (err) => {
            if (err) console.log(err);
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => console.log("Failed to connect", error));


