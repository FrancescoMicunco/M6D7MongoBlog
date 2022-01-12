import mongoose from 'mongoose'

const { Schema, model } = mongoose

const blogPost = new Schema({

    category: { type: String, required: true },
    title: String,
    cover: String,
    readTime: {
        "value": String,
        "unit": String,
    },
    author: {
        name: String,
        avatar: String,
    },
    content: String,
    comments: [{ comment: { type: String } }]

})

export default model("Blog", blogPost);