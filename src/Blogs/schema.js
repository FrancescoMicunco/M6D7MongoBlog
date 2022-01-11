import mongoose from 'mongoose'

const { Schema, model } = mongoose

const blogPost = new Schema({

    category: { type: String },
    title: { type: String },
    cover: { type: String },
    readTime: {
        "value": { type: Number },
        "unit": { type: String }
    },
    author: {
        name: { type: String },
        avatar: { type: String }
    },
    content: { type: String },

})

export default model("Blog", blogPost);