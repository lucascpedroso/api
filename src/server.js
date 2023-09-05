require("express-async-errors")
require("dotenv/config")

const migationsRun = require("./database/sqlite/migrations")

const AppError = require("../src/utils/AppError")
const uploadConfig = require("./configs/upload")
const cors = require("cors")

// importou o express
const express = require("express")
const routes = require("./routes")

migationsRun()

// inicializou o express
const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use(( error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})


// Informou a porta que a API vai ficar "Observando"
const PORT = process.env.PORT || 3333
//Colocamos o app para ouvir a PORT e quando a API inicializar, a messagem ira aparecer
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))