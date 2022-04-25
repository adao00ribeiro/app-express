import express from 'express'
import InventoryLocal from '../models/inventorylocal'
import InventoryLocalRepository from '../repositories/inventoryslocal-repository'
const inventoryLocalRouter = express.Router()

inventoryLocalRouter.post('/inventoryslocal', (req, res) => {
    const item: InventoryLocal = req.body
    InventoryLocalRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/inventorys/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})
//LE TODOS OS ITENS
inventoryLocalRouter.get('/inventoryslocal', (req, res) => {
    InventoryLocalRepository.lerTodos((itens) => res.json(itens))
})
//LER ITEM PELO ID
inventoryLocalRouter.get('/inventoryslocal/:id', (req, res) => {
    const id: number = +req.params.id
    InventoryLocalRepository.ler(id,(itens) => {
        if (itens) {
            res.json(itens)
        } else {
            res.status(404).send()
        }
    })
})
//ATUALIZAR ITEM PELO ID
inventoryLocalRouter.put('/inventoryslocal/:id', (req, res) => {
    const id: number = +req.params.id
    InventoryLocalRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
//APAGAR ITEM PELO ID
inventoryLocalRouter.delete('/inventoryslocal/:id', (req, res) => {
    const id: number = +req.params.id
    InventoryLocalRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default inventoryLocalRouter