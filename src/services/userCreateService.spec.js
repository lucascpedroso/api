const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
    let userRepositoryInMemory = null
    let userCreateService = null

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })
    // This function you have to include what you expect and the function that will run the test
    it("User should be created", async () => {
        const user = {
            name:  "User Test",
            email: "user@test.com",
            password: "123"
        }

        const userCreated = await userCreateService.execute(user)

        expect(userCreated).toHaveProperty("id")
    });

    it("User should not be created with an existing email", async () => {
        const user1 = {
            name:  "User1 Test",
            email: "user@test.com",
            password: "123"
        }

        const user2 = {
            name:  "User2 Test",
            email: "user@test.com",
            password: "123"
        }

        await userCreateService.execute(user1)
        await expect(userCreateService.execute(user2)).rejects.toEqual( new AppError("Email already in use!"))
    })
})
