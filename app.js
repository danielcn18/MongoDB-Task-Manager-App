const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Task = require('./models/task'); 
/* const bodyParser = require('body-parser'); */

const port = process.env.PORT || 3000;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://dchiquete2019:97Ap4KcvLRfmz6Hs@cluster0.nr0zix5.mongodb.net/TaskApp')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    });

// Set EJS as the view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', {tasks});
});

// Add Task route 
app.post('/add', async (req, res) => {
    const task = new Task({name: req.body.task});
    await task.save();
    res.redirect('/'); 
});

// Edit task form route
app.get('/edit/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('edit', {task});
});

// Update task route
app.post('/edit/:id', async (req, res) => {
    const {name} = req.body;
    await Task.findByIdAndUpdate(req.params.id, {name});
    res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});