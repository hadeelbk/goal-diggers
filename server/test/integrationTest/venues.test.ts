import express from "express";
import router from "../../router";
import supertest from "supertest";
import * as mongoose from "mongoose";
const databaseName = "gd-test";

describe("User Component", () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  // Setup connection to test db
  beforeAll(async () => {
    const url = "mongodb://127.0.0.1/" + databaseName;
    await mongoose.connect(url);
  });

  // Closes db connection
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("comes with predefined venues and serves them from /venues", async () => {
    const { default: Venue } = await import("../../models/venue") // import module dynamically in order to await prefilling
    const dbVenues = await Venue.find({});
    const { body: apiVenues } = await request.get("/venues");
    expect(dbVenues.length > 0).toBeTruthy();
    expect(dbVenues.length).toBe(apiVenues.length);
  })

})