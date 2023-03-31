import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

console.warn(process.env.API_KEY)

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Success',
    })
});

app.post('/', async (req, res) => {
    try {
        const promt = req.body.prompt;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            promt: `${promt}`
        });

        res.status(200).send({
            bot: response.data.choices[0].message.content
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen (5000, () => console.log('Server listening on port http://localhost:5000'));