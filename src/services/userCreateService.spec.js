const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")

// This function you have to include what you expect and the function that will run the test

it("User should be created", async () => {
    const user = {
        name:  "User Test",
        email: "user@test.com",
        password: "123"
    }

    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepositoryInMemory)
    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty("id")
});