const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');
const { response, request } = require('express');

const app = express();

app.use(cors()); //wont block the incoming api calls
app.use(express.json()); //send data in json form
app.use(express.urlencoded({ extended: false })); // not gonna be sending any form data


// create
app.post('/insert', (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);
    result
    .then(data => res.json({ data: data }))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (req, res) => {
    // console.log('test');
    // response.json({
    //     success: true
    // });  

    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// update


// delete
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    result
        .then(data => res.json({ success:data }))
        .catch(err => console.log(err));
});


app.listen(process.env.PORT, () => console.log('app is running'));