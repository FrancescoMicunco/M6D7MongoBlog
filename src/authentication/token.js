import createHttpError from 'http-errors'
import { verifyJWT } from './tools.js'

export const JWTAuthMiddleware = async(req, res, next) => {

    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide a token"))
    } else {
        try {
            const token = req.headers.authorization.replace("Bearer", "")
            const payload = await verifyJWT(token)
            req.author = {
                _id: payload._id,
                role: payload.role,
            }
            next()
        } catch (error) {
            next(createHttpError(401, "Invalid Token"))
        }
    }
}