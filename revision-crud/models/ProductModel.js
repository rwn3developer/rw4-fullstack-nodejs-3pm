const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});
const product = mongoose.model('product', productSchema);
module.exports = product;