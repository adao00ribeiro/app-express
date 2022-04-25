import express from 'express'
import User from '../models/user'
import ListUser from '../Lunitymodels/ListUser'
import userRepository from '../repositories/user-repository'
const userRouter = express.Router()

//CRIA UM USER
userRouter.post('/user', (req, res) => {
    const item: User = req.body
    userRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/user/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})
//LE TODOS OS USER
userRouter.get('/user', (req, res) => {
    const list = new ListUser();
    userRepository.lerTodos((itens) =>{
        for (let index = 0; index < itens.length; index++) {
            list.users.push(itens[index]);
        }
    res.json(list)
    })
})

//LER USER PELO ID
userRouter.get('/user/:username/:password', (req, res) => {
    const username: string = req.params.username;
    const password: string = req.params.password;
    userRepository.ler(username,password,(item) => {
        if (item) {
            res.json(item)
        } else {
            res.status(404).send()
        }
    })
})
//ATUALIZAR USER PELO ID
userRouter.put('/user/:id', (req, res) => {
    const id: number = +req.params.id
    userRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
//APAGAR USER PELO USERNAME
userRouter.delete('/user/:id', (req, res) => {
    const id: number = +req.params.id
    userRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default userRouter
