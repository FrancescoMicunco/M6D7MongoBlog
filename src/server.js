import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import BlogPostRouter from './Blogs/schema.js'

const server = express()

server.use(cors())

// ==========  endPoints ==========
server.use('/blogPost', BlogPostRouter)


// ========== connection ==========

console.table(listEndpoints(server))
mongoose.connect(DB_CONNECTION);