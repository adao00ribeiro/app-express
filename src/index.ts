import express from 'express'
import cors from 'cors'

import characterRouter from './routers/character-router'
import inventoryglobalRouter from './routers/inventorysglobal-router'
import inventorylocalRouter from './routers/inventoryslocal-router'
import itensRouter from './routers/itens-router'
import listcharacterRouter from './routers/listcharacter-router'
import userRouter  from './routers/users-router'
import servidorRouter from './routers/servidor-router'
// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
// App Express
const app = express()
// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})
// Cors
app.use(cors({
    origin: ['http://localhost:3000']
}))
// Rotas
app.use('/api', characterRouter)
app.use('/api', inventoryglobalRouter)
app.use('/api', inventorylocalRouter)
app.use('/api', itensRouter)
app.use('/api', listcharacterRouter)
app.use('/api', userRouter)
app.use('/api', servidorRouter)
// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
    res.status(404)
})
// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})