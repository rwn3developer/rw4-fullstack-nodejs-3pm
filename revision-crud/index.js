const express = require('express');

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

const connectDB = require('./config/db');
connectDB(); // Connect to MongoDB

app.use(express.urlencoded());

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);

})