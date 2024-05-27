import express from "express"
import routes from "./routes/index.routes"
import bodyParser from 'body-parser';
import { redisConnect } from "./config/redis.config";
import { sendEmailConsumer } from "./consumers/sendEmail.consumer";
require('dotenv').config();

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use('/api/v1/', routes)

try {
    redisConnect()
    app.listen(PORT)
    sendEmailConsumer().catch(console.error)
    console.log("Iniciado com sucesso na porta: ", PORT)
} catch (error) {
    
}
