import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import blogRouter from './Blogs/index.js'
import {
    badRequestHandler,
    notFoundHandler,
    genericErrorHandler
} from './errorHandlers.js'

const server = express()

const PORT = process.env.PORT || 3001

server.use(cors())

// ==========  endPoints ==========
server.use('/blog', blogRouter)


// ==========  errors handlers =========

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

// ========== connection ==========

try {
    mongoose.connect(process.env.DB_CONNECTION)
    server.listen(PORT, () => {
        console.table(listEndpoints(server))
        console.log(`server is running on port n. ${PORT}`)
    })
} catch (error) { handleError(error) }



mongoose.set('bufferCommands', false);