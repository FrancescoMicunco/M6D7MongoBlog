import express from 'express'
import q2m from 'query-to-mongo'
import CommentModel from './schema.js'

const router = express.Router();

router
    .route('/')

.get(async(req, res, next) => {
    try {
        const mquery = q2m(req.query)
        const total = await CommentModel.countDocuments(mquery.criteria)
        const comment = await CommentModel.find(mquery.criteria).skip(mquery.options.skip || 0).limit(mquery.options.limit).sort(mquery.options.sort)
        res.send({ links: mquery.links("/comment", total), totalPage: Math.ceil(total / mquery.options.limit), total, comment })

    } catch (error) {
        next(error)
    }
})


export default router