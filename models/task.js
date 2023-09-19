const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Task', taskSchema);