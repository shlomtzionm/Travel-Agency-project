import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { token } from "./userController.test";
import { VacationModel } from "../src/3-models/vacationModel";


describe("Testing get all vacations", () => {
  it("should return all vacations", async () => {
    const response = await supertest(app.server)
    .get("/api/vacations-by-user/1")
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.length.above(0);
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("location");
    expect(response.body[0]).to.have.property("description");
  });

  it("should return error", async () => {
    const response = await supertest(app.server)
    .get("/api/vacations-by-user/100")
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.status).to.be.equal(404);
   
  });
});

describe("Testing get one vacation", () => {
  it("should return one vacation", async () => {
    const response = await supertest(app.server)
    .get("/api/vacations-by-user/1/4")
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("location");
    expect(response.body).to.have.property("description");
    expect(response.body).to.not.be.an("array");
  });

  it("should return error", async () => {
    const response = await supertest(app.server)
    .get("/api/vacations-by-user/1000/4")
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.status).to.be.equal(404);
    
  });

  it("should return error wont find vacation 4000", async () => {
    const response = await supertest(app.server)
    .get("/api/vacations-by-user/1/4000")
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.status).to.be.equal(404);
    
  });
});

const fs = require("fs");
const path = require("path");
describe("Testing add vacation", () => {
 
  it("should return status 201", async () => {
 
    const vacation = new VacationModel({
      location: "here",
      description: "here",
      price: 1,
      startDate: new Date("11-11-2024"),
      endDate: new Date("12-12-2024"),
    });

    const imagePath = path.join(__dirname, "test-image.png");
    const imageBuffer = fs.readFileSync(imagePath);

    const startDate = vacation.startDate.toISOString().split("T")[0];
    const endDate = vacation.endDate.toISOString().split("T")[0];

    const response = await supertest(app.server)
      .post("/api/vacations")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("location", vacation.location)
      .field("description", vacation.description)
      .field("price", vacation.price)
      .field("startDate", startDate)
      .field("endDate", endDate)
      .attach("image", imageBuffer, "test-image.jpg");

    expect(response.status).to.be.equal(201);
  
  });

   
  it("should return status 201", async () => {
 
    const vacation = new VacationModel({
      location: "here",
      price: 1,
      startDate: new Date("11-11-2024"),
      endDate: new Date("12-12-2024"),
    });
    
    const imagePath = path.join(__dirname, "test-image.png");
    const imageBuffer = fs.readFileSync(imagePath);

    const startDate = vacation.startDate.toISOString().split("T")[0];
    const endDate = vacation.endDate.toISOString().split("T")[0];

    const response = await supertest(app.server)
      .post("/api/vacations")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("location", vacation.location)
      .field("price", vacation.price)
      .field("startDate", startDate)
      .field("endDate", endDate)
      .attach("image", imageBuffer, "test-image.jpg");

    expect(response.status).to.be.equal(400);
  
  });
});