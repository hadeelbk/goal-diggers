import express from "express";
const router = require("../router");
import supertest from "supertest";
import * as mongoose from "mongoose";
import User from "../models/user";
const databaseName = "gd-test";

describe("User Component", () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  // Mock data
  const mockUser = {
    userName: "Testuser",
    password: "test1234",
    email: "test@test.test",
    firstName: "Test",
    lastName: "User",
    dateOfBirth: "18.11.2024",
    position: "Goalie"
  };

  // Setup connection to test db
  beforeAll(async () => {
    const url = "mongodb://127.0.0.1/" + databaseName;
    await mongoose.connect(url);
  });

  // Clean up test db after each test
  afterEach(async () => {
    await User.deleteMany();
  });

  // Closes db connection
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("creates a new user", async () => {
    const { body: apiUser } = await request.post("/users").send(mockUser)
    const dbUser = await User.findOne({_id: apiUser._id})
    expect(dbUser?.userName).toBe(mockUser.userName)
  })

  it("returns new user from /users and /user/:id endpoint", async() => {
    const { body: postUser } = await request.post("/users").send(mockUser);
    const { body: getAllUsers } = await request.get("/users");
    const { body: getOneUser } = await request.get("/users/" + postUser._id);
    expect(getOneUser?.userName).toBe(mockUser.userName);
    expect(getAllUsers.some((user: any) => user._id === postUser._id)).toBeTruthy();
  })

  it("returns all users currently in db from /users endpoint", async () => {
    async function getAllUsers () {
      const { body: apiAllUsers } = await request.get("/users");
      const dbAllUsers = await User.find({});
      return { apiAllUsers, dbAllUsers };
    }
    const first = await getAllUsers();
    expect(first.apiAllUsers.length).toBe(first.dbAllUsers.length);
    await request.post("/users").send(mockUser);
    const second = await getAllUsers();
    expect(second.apiAllUsers.length).toBe(second.dbAllUsers.length);
  })

  it("allows existing user to login", async () => {
    await request.post("/users").send(mockUser);
    const res = await request.post("/login").send({usernameOrEmail: mockUser.userName, password: mockUser.password});
    expect(res.body.username).toBe(mockUser.userName);
  })

  it("doesn't allow existing user to login with wrong password", async () => {
    await request.post("/users").send(mockUser);
    const res = await request.post("/login").send({usernameOrEmail: mockUser.userName, password: ""});
    expect(res.statusCode).toBe(400);
  })

  it("doesn't allow non-existent user to login", async () => {
    const res = await request.post("/login").send({usernameOrEmail: "", password: ""});
    expect(res.statusCode).toBe(400);
  })

})