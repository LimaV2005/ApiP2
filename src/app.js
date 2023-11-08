import express from 'express'
import cors from 'cors'
import routes from './routes.js'
const app = express()
//EXECUTAR AS ROTAS


//indicar pro express ler body com JSON
app.use(express.json())
app.use(cors())
app.use(routes)




export default app