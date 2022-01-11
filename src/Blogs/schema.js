import express from 'express'
import { Mongoose } from 'mongoose'


const blogPost = new Mongoose.schema({
    "_id": "MONGO GENERATED ID",
    "category": "ARTICLE CATEGORY",
    "title": "ARTICLE TITLE",
    "cover": "ARTICLE COVER (IMAGE LINK)",
    "readTime": {
        "value": Number,
        "unit": "minute"
    },
    "author": {
        "name": "AUTHOR NAME",
        "avatar": "AUTHOR AVATAR LINK"
    },
    "content": "HTML",
    "createdAt": "DATE",
    "updatedAt": "DATE"
})