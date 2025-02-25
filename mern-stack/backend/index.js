const express = require('express');

const app = express();

const db = require('./config/database');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

//coudinary setup
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process?.env.CLOUDINARY_SECRET_KEY,
})


const PORT = process.env.PORT || 8000;

app.use(express.urlencoded());
app.use(express.json());

app.use('/', require('./routes/indexRoute'));

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${PORT}`);
})