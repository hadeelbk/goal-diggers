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
  }

  // Setup connection to test db
  beforeAll(async () => {
    const url = "mongodb://127.0.0.1/" + databaseName;
    await mongoose.connect(url);
  });

  // Clean up test db afterwards
  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("creates a new user", async () => {
    await request.post("/users", ).send(mockUser)
    const res = await User.findOne({userName: mockUser.userName})
    expect(res?.userName).toBe(mockUser.userName)
  })

})