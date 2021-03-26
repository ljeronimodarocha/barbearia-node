const express = require('express')
const routes = require('./routes')


//const cors = require('./headers')
//process.env.TZ = 'America'

const cors = require('cors')

const app = express()

const port = 3000
app.use(cors({
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ['Authorization']
}));
//app.use(cors)


routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app