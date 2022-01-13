import mongoose from 'mongoose'

const { Schema, model } = mongoose

const author = new Schema({

    name: { type: String, required: true },
    lastname: { type: String, required: true }
})

export default model("Author", author);