import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET!

export interface AuthRequest extends Request {
    user?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
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