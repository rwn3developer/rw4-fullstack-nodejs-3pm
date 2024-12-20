const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const db = await mongoose.connect(`mongodb+srv://SaurabhKachhadiya:SaurabhKachhadiya@cluster0.7att4.mongodb.net/mongodb-crud`);
        console.log(`Database is successfully connected in host ${db.connection.host}`);

    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = connectDb;

