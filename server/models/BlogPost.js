const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [8, "Title must be at least 8 characters long."],
        maxlength: [200, "Title must be 200 characters at most."],
        required: true
    },
    text: {
        type: String,
        minlength: [200, "Blog Post must be at least 200 characters long."],
        maxlength: [10000, "Blog Post must be 10000 characters at most."],
        required: true
    },
    someNumber: {
        type: Number,
        default: 123
    },
    someBoolean: {
        type: Boolean,
        default: true
    },
    someDate: {
        type: Date,
        default: Date.now()
    },
    someArray: {
        type: Array,
        default: ['1', '2', '3']
    }
}, {
    timestamps: true
});

BlogPostSchema.index({ title: 'text' })

module.exports = mongoose.model("BlogPost", BlogPostSchema);
