const express = require('express');
const mongoose = require('mongoose');

// ***TODO: ❌ change to require('./routes/user);
const users = require('./server.js');
const db = "mongodb + srv: //saikumar2912:saikumar@cluster0.6llhp.mongodb.net/sai?retryWrites=true&w=majority"
const port = 4000;
const app = express();

app.use(express.json());

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('MongoDB Connnected');
    })
    .catch((err) => {
        console.log({ err: err });
    });

app.get('/greet', (req, res) => {
    res.send('Hello');
});

//app.use('/users', users);

app.listen(port, (err) => {
    if (err) {
        console.log({ err: err });
    }
    console.log('Server running on port ' + port);
});