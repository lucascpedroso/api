class UserCreateService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password }) {
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if(checkUserExists) {
            throw new AppError("Email already in use!")
        }

        const hashedPassword = await hash(password, 8)

        await this.usersRepository.create({ name, email, password: hashedPassword })

    }
}

module.exports = UserCreateService