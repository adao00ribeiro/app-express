import express from 'express'
import InventoryGlobal from '../models/InventoryGlobal'
import InventoryGlobalRepository from '../repositories/inventorysglobal-repository'
const inventoryGlobalRouter = express.Router()

inventoryGlobalRouter.post('/inventorysglobal', (req, res) => {
    const item: InventoryGlobal = req.body
    InventoryGlobalRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/inventorys/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})
//LE TODOS OS ITENS
inventoryGlobalRouter.get('/inventorysglobal', (req, res) => {
    InventoryGlobalRepository.lerTodos((itens) => res.json(itens))
})
//LER ITEM PELO ID
inventoryGlobalRouter.get('/inventorysglobal/:id', (req, res) => {
    const id: number = +req.params.id
    InventoryGlobalRepository.ler(id,(itens) => {
        if (itens) {
            res.json(itens)
        } else {
            res.status(404).send()
        }
    })
})
//ATUALIZAR ITEM PELO ID
inventoryGlobalRouter.put('/inventorysglobal/:id', (req, res) => {
    const id: number = +req.params.id
    InventoryGlobalRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
//APAGAR ITEM PELO ID
inventoryGlobalRouter.delete('/inventorysglobal/:id', (req, res) => {
    const id: number = +req.params.id
    InventoryGlobalRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default inventoryGlobalRouter