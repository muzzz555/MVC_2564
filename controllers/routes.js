const express = require("express");
const app = express();
const logic = require("./logic");
const fs = require('fs');
//test server
app.get('/ping', (req, res) => {
    res.send('pong')
});

//Assignment
app.post('/Assignment', async (req, res) => {
    try {
        let result = await new logic().CreateAssignment(req.body);
        res.status(201).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

//Turnin
app.post('/Turnin', async (req, res) => {
    try {
        let result = await new logic().TurninAssignment(req.body);
        res.status(201).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

app.get('/TurninGet', async (req, res) => {
    fs.readFile('models/TurninDB.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        console.log(student);
        res.json(student) 
    });
    
    console.log('This is after the read call');
    // res.json({
    //     data:"Hello"
    // })
});

module.exports = app;