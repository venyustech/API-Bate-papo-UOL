import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dayjs from "dayjs";
import "dayjs/locale/pt-br.js";
// import joi from "joi";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors());
app.use(json());

app.listen(5000, () => {
    console.log("rodando em https://localhost:5000")
})

app.get("/participants", async (_, res) => {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    try {
        await mongoClient.connect();
        const participants = await mongoClient
            .db("uol-chat")
            .collection("participants")
            .find({})
            .toArray();
        res.status(200).send(participants);
        mongoClient.close();
    } catch (error) {
        res.send("#01ERROR: get participants");
        mongoClient.close();
    }
});

app.post("/participants", async (req, res) => {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    try {
        await mongoClient.connect();
        const userName = await mongoClient
            .collection("participants")
            .db("uol-chat")
            .inserOne({
                name: req.body.name,
                lastStatuss: Data.now(),
            });
        res.status(201).send(userName);

        mongoClient.close();
    } catch (error) {
        res.send("#02ERROR: post participants");
        mongoClient.close();
    }
});

app.post("/messages", async (req, res) => {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    try {
        await mongoClient.connect();
        const message = await mongoClient
            .db("uol-chat")
            .collection("messages")
            .insertOne({
                from: req.headers.user,
                to: req.body.to,
                text: req.body.text,
                type: req.body.type,
                time: `${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`,
            });
        res.status(200).send(message);
        mongoClient.close();
    } catch (error) {
        res.status(400).send("#03ERROR: post messages")
    }
});
