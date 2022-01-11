import express from 'express'
import BlogsModel from './schema.js'

const router = express.Router();

router
    .route('/')
    .post(async(req, res, next) => {
        try {
            const blog = await BlogsModel(req.body)
            const { _id } = await blog.save()
            res.status(201).send({ _id })
        } catch (error) {
            next(error)
        }
    })
    .get(async(req, res, next) => {
        try {
            const blog = await BlogsModel.find()
            res.status(200).send(blog)

        } catch (error) {
            next(error)
        }
    })

router
    .route('/:id')
    .get(async(req, res, next) => {
        try {
            const blog = await BlogsModel.findById(req.params.id)
            if (blog === null) { "this blog doesn't exist" } else {
                res.send(blog)
            }

        } catch (error) {
            next(error)
        }
    })

.put(async(req, res, next) => {
    try {
        const blog = await BlogsModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (blog === null) { "this blog doesn't exist" } else {
            res.send(blog)
        }
    } catch (error) {
        next(error)
    }
})

.delete(async(req, res, next) => {
    try {
        const blog = await BlogsModel.findByIdAndDelete(req.params.id)
        console.log(blog)
        if (blog > 0) {
            res.send("201 - blog deleted!")
        } else { res.send("Blog not found!") }
    } catch (error) {
        next(error)
    }
})

export default router