import express from 'express'
import Blogs from './schema.js'

const router = express.Router();

router
    .route('/')
    .get(async(req, res, next) => {
        try {
            const blog = await Blogs.findAll()
            res.send(blog)
        } catch (error) {
            next(error)
        }
    })
    .post(async(req, res, next) => {
        try {
            const blog = await Blogs.create(req.body)
            res.send("201 - blogPost correctly added")
        } catch (error) {
            next(error)
        }
    })

router
    .route('/:id')
    .get(async(req, res, next) => {
        try {
            const blog = await Blogs.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (blog === null) { "this blog doesn't exist" } else {
                res.send(user)
            }

        } catch (error) {
            next(error)
        }
    })

.put(async(req, res, next) => {
    try {
        const blog = await Blogs.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        res.send(user)
    } catch (error) {
        next(error)
    }
})

.delete(async(req, res, next) => {
    try {
        const blog = await Blogs.destroy({
            where: {
                id: req.params.id
            }
        })
        if (blog > 0) {
            res.send("201 - blog deleted!")
        } else { res.send("Blogs not found!") }
    } catch (error) {
        next(error)
    }
})






export default router