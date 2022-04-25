import express from 'express'
import ListCharacter from '../models/listcharacter'
import ListCharacterRepository from '../repositories/listcharacter-repository'
const listcharacterRouter = express.Router()

listcharacterRouter.post('/listcharacters', (req, res) => {
    const item: ListCharacter = req.body
    ListCharacterRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/inventorys/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})
//LE TODOS OS ITENS
listcharacterRouter.get('/listcharacters', (req, res) => {
    ListCharacterRepository.lerTodos((itens) => res.json(itens))
})
//LER ITEM PELO ID
listcharacterRouter.get('/listcharacters/:id', (req, res) => {
    const id: number = +req.params.id
    ListCharacterRepository.ler(id,(itens) => {
        if (itens) {
            res.json(itens)
        } else {
            res.status(404).send()
        }
    })
})
//ATUALIZAR ITEM PELO ID
listcharacterRouter.put('/listcharacters/:id', (req, res) => {
    const id: number = +req.params.id
    ListCharacterRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
//APAGAR ITEM PELO ID
listcharacterRouter.delete('/listcharacters/:id', (req, res) => {
    const id: number = +req.params.id
    ListCharacterRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default listcharacterRouter