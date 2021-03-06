import jwt from "jsonwebtoken"

export const JWTAuthenticate = async author => {
    const accessToken = await generateJWTToken({ _id: author._id, role: author.role })
    return accessToken
}


const generateJWTToken = payload =>
    new Promise((resolve, reject) =>
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            })
    )


export const verifyJWT = token =>
    new Promise((resolve, reject) =>
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) reject(err)
            else resolve(payload)

        })

    )