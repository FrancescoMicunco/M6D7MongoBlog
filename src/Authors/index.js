import express from 'express'
import AuthorsModel from './schema.js'


const router = express.Router();

router
    .route('/')
    .post(async(req, res, next) => {
        try {
            const author = await AuthorsModel(req.body)
            const { _id } = await author.save()
            res.status(201).send({ _id })
        } catch (error) {
            next(error)
        }
    })
    .get(async(req, res, next) => {
        try {
            const author = await AuthorsModel.find().limit(4)
            res.status(200).send(author)

        } catch (error) {
            next(error)
        }
    })

router
    .route('/:id')
    .get(async(req, res, next) => {
        try {
            const author = await AuthorsModel.findById(req.params.id)
            if (author === null) { "this author doesn't exist" } else {
                res.send(author)
            }
        } catch (error) {
            next(error)
        }
    })



.put(async(req, res, next) => {
    try {
        const author = await AuthorsModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (author === null) { "this author doesn't exist" } else {
            res.send(author)
        }
    } catch (error) {
        next(error)
    }
})

.delete(async(req, res, next) => {
    try {
        const author = await AuthorsModel.findByIdAndDelete(req.params.id)
        console.log("this is author from delete", author)
        if (author) {
            res.send("201 - author deleted!")
        } else { res.send("author not found!") }
    } catch (error) {
        next(error)
    }
})



export default router