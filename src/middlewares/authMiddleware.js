import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function authMiddleware(req, res, next) {
    const auth = req.headers.authorization

    if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
        const token = auth.split(' ')[1]
        req.user = jwt.verify(token, JWT_SECRET)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Token inválido ou expirado' })
    }
}