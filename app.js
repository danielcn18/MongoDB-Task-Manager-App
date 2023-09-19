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

app.post('/add', async (req, res) => {
    const task = new Task({name: req.body.task});
    await task.save();
    res.redirect('/'); 
});

/* app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);
    res.render('edit', { task });
});

app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        task.text = updatedText;
    }
    res.redirect('/');
});  */

/* app.get('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id === taskId);

}) */

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});