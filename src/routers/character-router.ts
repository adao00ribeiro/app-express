import express from 'express'
import Character from '../models/character'
import CharacterRepository from '../repositories/character-repository'
const characterRouter = express.Router()

characterRouter.post('/characters', (req, res) => {
    const item: Character = req.body
    CharacterRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/inventorys/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})
//LE TODOS OS ITENS
characterRouter.get('/characters', (req, res) => {
    CharacterRepository.lerTodos((itens) => res.json(itens))
})
//LER ITEM PELO ID
characterRouter.get('/characters/:id', (req, res) => {
    const id: number = +req.params.id
    CharacterRepository.ler(id,(itens) => {
        if (itens) {
            res.json(itens)
        } else {
            res.status(404).send()
        }
    })
})
//ATUALIZAR ITEM PELO ID
characterRouter.put('/characters/:id', (req, res) => {
    const id: number = +req.params.id
    CharacterRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
//APAGAR ITEM PELO ID
characterRouter.delete('/characters/:id', (req, res) => {
    const id: number = +req.params.id
    CharacterRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default characterRouter