const request = require("supertest");
const app = require("../app");
const { User, Product } = require("../models");
const { signToken } = require("../helpers/jwt");

let access_token;
let user;

beforeAll(async () => {
  user = await User.create({
    username: "testing username",
    email: "testingemail@mail.com",
    role: "admin",
    password: "123456",
  });
  user = await User.findOne({
    where: {
      email: "testingemail@mail.com",
    },
  });
  access_token = signToken(user);
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /login", () => {
  test("Login with invalid email", async () => {
    const loginUser = {
      email: "wrongmail@mail.com",
      password: "123456",
    };
    const response = await request(app)
      .post("/login")
      .send(loginUser)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email / password");
  });

  test("Login with invalid password", async () => {
    const loginUser = {
      email: "testingemail@mail.com",
      password: "wrongpassword",
    };
    const response = await request(app)
      .post("/login")
      .send(loginUser)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email / password");
  });

  test("Login when password is empty", async () => {
    const loginUser = {
      email: "testingemail@mail.com",
      password: "",
    };
    const response = await request(app)
      .post("/login")
      .send(loginUser)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("Login when email is empty", async () => {
    const loginUser = {
      email: "",
      password: "123456",
    };
    const response = await request(app)
      .post("/login")
      .send(loginUser)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
});

describe("POST /register", () => {
  test("Successfully register new user", async () => {
    const newUser = {
      username: "new user test",
      email: "newusertest@mail.com",
      password: "newpassword",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", newUser.email);
  });

  test("register new user without provided email", async () => {
    const newUser = {
      username: "new user test",
      password: "newpassword",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("register new user without provided password", async () => {
    const newUser = {
      username: "new user test",
      email: "newusertest@mail.com",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("register new user without provided username", async () => {
    const newUser = {
      email: "newusertest@mail.com",
      password: "newpassword",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Username is required");
  });

  test("register new user with empty string email", async () => {
    const newUser = {
      username: "new user test",
      email: "",
      password: "newpassword",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("register new user with empty string password", async () => {
    const newUser = {
      username: "new user test",
      email: "newusertest@mail.com",
      password: "",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("register new user with existing email", async () => {
    const newUser = {
      username: "new user test",
      email: "newusertest@mail.com",
      password: "newpassword",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email already exist");
  });
});
