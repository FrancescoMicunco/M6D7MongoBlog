import mongoose from 'mongoose'

const { Schema, model } = mongoose

const blogPost = new Schema({

    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
        "value": { type: Number },
        "unit": String,
    },
    author: [{ type: Schema.Types.ObjectId, ref: "Author" }],
    content: String,
    comments: [{ comment: { type: String } }]

})

export default model("Blog", blogPost);