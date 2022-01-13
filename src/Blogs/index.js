import express from 'express'
import BlogsModel from './schema.js'
import CommentsModel from '../Comments/schema.js'
import q2m from 'query-to-mongo'


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
            const query = q2m(req.query)
            const blog = await BlogsModel.find()
                .skip(query.options.skip)
                .limit(query.options.limit)
                .sort(query.options.sort)
                .populate('author', 'name avatar')
            res.status(200).send(blog)

        } catch (error) {
            next(error)
        }
    })

router
    .route('/:id')
    .get(async(req, res, next) => {
        try {
            const blog = await BlogsModel.findById(req.params.id).populate('author', 'name avatar')
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
        if (blog) {
            res.send("201 - blog deleted!")
        } else { res.send("Blog not found!") }
    } catch (error) {
        next(error)
    }
})



router
    .route('/:id/comments')
    .get(async(req, res, next) => {
        try {
            const blog = await BlogsModel.findById(req.params.id)
            if (blog) {
                res.send(blog.comments)
            } else { res.send("") }
        } catch (error) {
            next(error)
        }
    })

.post(async(req, res, next) => {
    try {
        const updateBlogWithComment = await BlogsModel.findByIdAndUpdate(req.params.id, {

            $push: { comments: req.body },


        }, { new: true })

        if (updateBlogWithComment) {

            res.send(updateBlogWithComment)

        } else { console.log("there are no blogs to update") }

    } catch (error) {
        next(error)
    }
})



router
    .route('/:id/comments/:commentId')
    .get(async(req, res, next) => {
        try {
            const blog = await BlogsModel.findById(req.params.id)
            if (blog) {
                const comment = blog.comments.find(c => c._id.toString() === req.params.commentId)
                if (comment) {
                    res.send(comment)
                } else { console.log("comment not found!") }
            } else {
                console.log("blog not found")
            }
        } catch (error) {
            next(error)
        }
    })

.put(async(req, res, next) => {
    try {
        const blog = await BlogsModel.findById(req.params.id)
        if (blog) {

            const index = blog.comments.findIndex(c => c._id.toString() === req.params.commentId)
            console.log(index)
            if (index !== -1) {

                blog.comments[index] = {...blog.comments[index].toObject(), ...req.body }

                await blog.save()

            } else {
                console.log("comment not found!")
            }

        }

    } catch (error) {
        next(error)
    }
})

.delete(async(req, res, next) => {
    try {
        const blog = await BlogsModel.findByIdAndUpdate(req.params.id, { $pull: { comments: { _id: req.params.commentId } } }, { new: true })
        if (blog) {
            res.send(blog)
        } else { console.log("comment not found!") }
    } catch (error) {
        next(error)
    }
})

export default router