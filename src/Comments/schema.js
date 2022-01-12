import mongoose from 'mongoose'

const { Schema, model } = mongoose

const comment = new Schema({


    content: String

})

export default model("Comment", comment);