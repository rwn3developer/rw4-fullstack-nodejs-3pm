const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/database');

app.use(express.urlencoded());

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);

})