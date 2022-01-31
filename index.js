import dotenv from "dotenv";
import express, { json } from 'express';
import cors from "cors";
import { MongoClient } from "mongodb";
dotenv.config();


const app = express();
app.use(cors());
app.use(json());

const testes = [
    {
        id: 1,
        nome: "bleble",
        autor: "raul de souza"
    },
    {
        id: 2,
        nome: "bleble",
        autor: "raul de souza"
    },

]

app.get("/livros", (req, res) => {
    res.send(testes)
})

app.get("/livros/:id", (req, res) => {

    const livrosFiltrados = testes.find(livro => livro.id === parseInt(req.params.id))
    res.send(livrosFiltrados)
})
app.post("/livros", (req, res) => {
    testes.push({ id: 4, nome: "blddedasmddse", autor: "3dasomdaksula de souza" });
    res.send(testes)
})

app.listen(5000, () => {
    console.log("rodando em https://localhost:5000")
}) 