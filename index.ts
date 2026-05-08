import 'dotenv/config'
import express, { Express } from 'express'
import cors from 'cors'

import authRouter from './src/routes/auth.js'
import criancasRouter from './src/routes/criancas.js'

const app: Express = express()

app.use(cors({
    origin: 'http://localhost:3001'
}))

app.use(express.json())

app.use(authRouter)
app.use(criancasRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})

export default app
