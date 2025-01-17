/*
    Metodos padrao de um Controller 

 * index - GET  para listar varios registros;
 * show - GET para exibir um registro especifico;
 * create - POST para criar um registro;
 * update - PUT para atualizar um registro;
 * delete - DELETE para remover um registro.
*/

const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const UsersRepository = require("../repositories/UsersRepository")
const UserCreateService = require("../services/UserCreateService")

class UsersController {
    async create(request, response) {
        const {name, email, password} = request.body

        const usersRepository = new UsersRepository()
        const userCreateService = new UserCreateService(usersRepository)

        await userCreateService.execute({ name, email, password })

        
        return response.status(201).json()
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if(!user) {
            throw new AppError("User not found")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Email already in use.")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password) {
            throw new AppError("You need to enter the old password.")
        }

        if(password && old_password) {
            const checkOldPassword = compare(old_password, user.password)

            if(!checkOldPassword) {
                throw new AppError("Your old password is incorrect.")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`, [ user.name, user.email, user.password, user_id])

        return response.json()
    }
}

module.exports = UsersController