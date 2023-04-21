// aqui contem explicacoes do request params, query params, entre outras coisas

// importou o express
const express = require("express")

// inicializou o express
const app = express()
app.use(express.json()) // add essa parte para que o node saiba que as infos enviadas pelo insomnia e' JSON

// Aqui estamos usando o method GET, primeiro informando onde(rota - route) "/" e uma funcao extraindo do express o request e response. No EX a api ira emitir a menssagem
app.get("/message/:id/:user", (request, response) => {
    const {id, user} = request.params // ao inves de fazer "MENSAGEM ${REQUEST.PARAMS.ID}"

    response.send(`
        Mensagem ID: ${id}.
        Para o usuario: ${user}.
    `)
})

app.get("/users", (request, response) => {
    const {page, limit} = request.query 

    response.send(`Page: ${page}. Limit: ${limit} `)
})

app.post("/users", (request, response) => {
    const {name, email, password} = request.body // Recedendo as info enviadas atraves do insomnia

    response.send(`Nome: ${name}. Email: ${email}. Password: ${password}`)

    //response.json({name, email, password}) receberiamos os dados em modo JSON do mesmo jeito que esta no insomnia
})


// Informou a porta que a API vai ficar "Observando"
const PORT = 3333

//Colocamos o app para ouvir a PORT e quando a API inicializar, a messagem ira aparecer
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))