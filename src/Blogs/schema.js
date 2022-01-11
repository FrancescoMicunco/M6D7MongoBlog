import express from 'express'
import mongoose from 'mongoose'

const { Schema } = new Schema({

    category: String,
    title: String,
    cover: String,
    readTime: {
        "value": Number,
        "unit": "minute"
    },
    author: {
        name: String,
        avatar: String
    },
    content: String,

})

const Blog = mongoose.model('Blog', blogSchema);