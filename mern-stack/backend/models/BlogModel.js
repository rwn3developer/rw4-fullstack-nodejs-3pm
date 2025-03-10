const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    blogimage: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    }
})
const blog = mongoose.model('blog', blogSchema);
module.exports = blog;