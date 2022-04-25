import express from "express";
import Servidor from "../models/Servidor";
import ListServer from "../Lunitymodels/ListServer";
import servidorRepository from "../repositories/servidor-repository";
const serviddorRouter = express.Router();

serviddorRouter.post("/servidor", (req, res) => {
  const item: Servidor = req.body;
  servidorRepository.criar(item, (id) => {
    if (id) {
      res.status(201).location(`/servidor/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});
//LE TODOS OS ITENS
serviddorRouter.get("/servidor", (req, res) => {
  const list = new ListServer();
  servidorRepository.lerTodos((itens) => {
    for (let index = 0; index < itens.length; index++) {
      list.servers.push(itens[index]);
    }
    res.json(list);
  });
});

//LER ITEM PELO ID
serviddorRouter.get("/servidor/:id", (req, res) => {
  const id: number = +req.params.id;
  servidorRepository.ler(id, (item) => {
    if (item) {
      res.json(item);
    } else {
      res.status(404).send();
    }
  });
});
//ATUALIZAR ITEM PELO ID
serviddorRouter.put("/servidor/:id", (req, res) => {
  const id: number = +req.params.id;
  servidorRepository.atualizar(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});
//APAGAR ITEM PELO ID
serviddorRouter.delete("/servidor/:id", (req, res) => {
  const id: number = +req.params.id;
  servidorRepository.apagar(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});
export default serviddorRouter;
