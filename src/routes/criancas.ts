import { Router } from 'express'
import { db } from '../database/db.js'
import { criancas } from '../database/schema.js'
import { eq } from 'drizzle-orm'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/criancas', async (req, res) => {
    try {
        const todasCriancas = await db.select().from(criancas)
        res.status(200).json(todasCriancas)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao listar crianças' })
    }
})

router.post('/criancas', authMiddleware, async (req, res) => {
    try {
        const { nomeCrianca, numeroEmbalagens, numeroMoedas, escola, serie } = req.body
        if (!nomeCrianca || !escola || !serie) {
            return res.status(400).json({ message: 'Nome, escola e série são obrigatórios' })
        }
        const [novaCrianca] = await db.insert(criancas).values({
            nomeCrianca,
            numeroEmbalagens: numeroEmbalagens ?? 0,
            numeroMoedas: numeroMoedas ?? 0,
            escola,
            serie
        }).returning()
        res.status(201).json(novaCrianca)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao adicionar a criança' })
    }
})

router.put('/criancas/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { nomeCrianca, numeroEmbalagens, numeroMoedas, escola, serie } = req.body
        if (!nomeCrianca || !escola || !serie) {
            return res.status(400).json({ message: 'Erro ao fazer update da criança' })
        }
        const [updateCrianca] = await db.update(criancas)
            .set({ nomeCrianca, numeroEmbalagens, numeroMoedas, escola, serie })
            .where(eq(criancas.id, Number(id)))
            .returning()
        res.status(200).json(updateCrianca)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao atualizar a criança' })
    }
})

router.delete('/criancas/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const [apagarCrianca] = await db.delete(criancas)
            .where(eq(criancas.id, Number(id)))
            .returning()
        res.status(200).json(apagarCrianca)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao apagar criança' })
    }
})

export default router
