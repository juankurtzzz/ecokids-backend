import { Router } from 'express'
import { db } from '../database/db.js'
import { user } from '../database/schema.js'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Preencha todos os campos' })
        }

        const existing = await db.select().from(user)
        if (existing.length > 0) {
            return res.status(403).json({ message: 'Usuário admin já existe' })
        }

        const [newUser] = await db.insert(user).values({ email, password }).returning()
        res.status(201).json({ message: 'Usuário criado', id: newUser.id })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao criar usuário' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Preencha email e senha' })
        }

        const [found] = await db.select().from(user).where(eq(user.email, email))

        if (!found || found.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas' })
        }

        const token = jwt.sign({ id: found.id, email: found.email }, JWT_SECRET!, {
            expiresIn: '8h'
        })

        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao fazer login' })
    }
})

export default router