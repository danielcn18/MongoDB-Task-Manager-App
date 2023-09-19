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


/* app.use(bodyParser.urlencoded({extended: false})); */

app.use(express.static('./public/style.css'));

let tasks = [];         

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/addTask', (req, res) => {
    const newTask = req.body.task;
    tasks.push({ id: Date.now(), text: newTask });
    console.log(tasks);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);
    res.render('edit', { task });
})

app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        task.text = updatedText;
    }
    res.redirect('/');
})

/* app.get('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id === taskId);

}) */

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});