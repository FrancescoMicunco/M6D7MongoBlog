import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import BlogPostRouter from './Blogs/schema.js'
import {
    badRequestHandler,
    notFoundHandler,
    genericErrorHandler
} from './errorHandlers.js'

const server = express()

const PORT = process.env.PORT || 3001

server.use(cors())

// ==========  endPoints ==========
server.use('/blogPost', BlogPostRouter)


// ==========  errors handlers =========

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

// ========== connection ==========


mongoose.connect(process.env.DB_CONNECTION);

mongoose.connection.on("server connected", () => {
    console.log("Mongo server connected")

    server.listen(PORT, () => {
        console.table(listEndpoints(server))
        console.log(`server is running on port n. ${PORT}`)
    })
})

mongoose.connection.on("error", err => { console.log(err) })