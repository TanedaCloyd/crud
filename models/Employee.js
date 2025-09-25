const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0 
    }
}, { 
    timestamps: true 
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;