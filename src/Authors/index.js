import express from 'express'
import authorModel from '../Authors/Schema.js'
import createHttpError from "http-errors"
import { JWTAuthMiddleware } from "../authentication/token.js"
import { adminOnlyMiddleware } from "../authentication/admin.js"
import { JWTAuthenticate } from "../authentication/tools.js"


const router = express.Router();

router
    .route('/register')
    .post(async(req, res, next) => {
        try {
            const author = await authorModel(req.body)
            const { _id } = await author.save()
            res.status(201).send({ _id })
        } catch (error) {
            next(error)
        }
    })

router
    .route('/')
    .get(
        async(req, res, next) => {
            try {
                const author = await authorModel.find()
                res.status(200).send(author)

            } catch (error) {
                next(error)
            }
        })

router
    .route('/me', )
    .put(JWTAuthMiddleware, async(req, res, next) => {
        try {
            const author = await authorModel.findByIdAndUpdate(req.author._id, req.body)
            if (author) {
                res.send(author)
            } else {
                next(401, 'Author not found!')
            }
        } catch (error) {
            next(error)
        }
    })

.get(JWTAuthMiddleware, async(req, res, next) => {
    const author = await authorModel.findById(req.author._id)
    if (author) {
        res.send(author)
    } else {
        next(401, "Author not found!")
    }
})

.delete(JWTAuthMiddleware, async(req, res, next) => {
    try {
        const author = await authorModel.findByIdAndDelete(req.author._id)
        if (author) {
            res.send()
        } else {
            next(401, `Author not found!`)
        }
    } catch (error) {
        next(error)
    }
})


router
    .route('/:id')
    .get(JWTAuthMiddleware, async(req, res, next) => {
        try {
            const author = await authorModel.findById(req.params.id)
            if (author === null) { "this author doesn't exist" } else {
                res.send(author)
            }
        } catch (error) {
            next(error)
        }
    })


.put(JWTAuthMiddleware, async(req, res, next) => {
    try {
        const author = await authorModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (author === null) { "this author doesn't exist" } else {
            res.send(author)
        }
    } catch (error) {
        next(error)
    }
})

.delete(JWTAuthMiddleware, async(req, res, next) => {
    try {
        const author = await authorModel.findByIdAndDelete(req.params.id)
        console.log("this is author from delete", author)
        if (author) {
            res.send("201 - author deleted!")
        } else { res.send("author not found!") }
    } catch (error) {
        next(error)
    }
})

router
    .route('/login')
    .post(async(req, res, next) => {
        try {
            const { email, password } = req.body;
            const author = await authorModel.checkCredentials(email, password)
            if (author) {
                const accessToken = await JWTAuthenticate(author)
                res.send({ accessToken })
            } else {
                next(createHttpError(401, "Please Check credentials"))
            }
        } catch (error) {
            next(error)
        }
    })


export default router