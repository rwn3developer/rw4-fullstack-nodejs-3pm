const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const con = await mongoose.connect(`mongodb+srv://dholakiyaumesh45:umesh123@cluster0.c5vzz.mongodb.net/revision-crud`);
        console.log(`mongodb successfully connected`, con.connection.host);
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = connectDB


// const db = mongoose.connection;




// db.on('connected', (err) => {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log(`db connected`);

// })
// module.exports = db;




