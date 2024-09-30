import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";

describe("Testing user register", () => {
  it("should return token after register with valid credentials", async () => {
    const user = {
      firstName: "John Doe",
      lastName: "John Doe",
      email: "johndoe@example3.com",
      password: "password123",
    };

    const response = await supertest(app.server).post("/api/register").send(user);

    expect(response.status).to.be.equal(201);
  });

  it("should return validation error for duplicate email", async () => {
    const user = {
      firstName: "shlomtz",
      lastName: "shlomtz",
      email: "shlomtzosh@gmail.com",
      password: "password123",
    };

    const response = await supertest(app.server).post("/api/register").send(user);

    expect(response.status).to.be.equal(400);
  });

  it("should return validation error for email syntax", async () => {
    const user = {
      firstName: "shlomtz",
      lastName: "shlomtz",
      email: "gmail.com",
      password: "password123",
    };

    const response = await supertest(app.server).post("/api/register").send(user);

    expect(response.status).to.be.equal(400);
  });

  it("should return validation error for short password", async () => {
    const user = {
      firstName: "shlomtz",
      lastName: "shlomtz",
      email: "sadsadas@gmail.com",
      password: "123",
    };

    const response = await supertest(app.server).post("/api/register").send(user);

    expect(response.status).to.be.equal(400);
  });
});

export let token = "";

describe("Testing user login", () => {
  it("should return token after login with valid credentials", async () => {
    const credentials = {
      email: "johndoe@example2.com",
      password: "password123",
    };

    const response = await supertest(app.server).post("/api/login").send(credentials);
    token = response.body;

    expect(response.status).to.be.equal(200);
  });
});

describe("Testing valid token", () => {
  it("should return true", async () => {
    const response = await supertest(app.server).post("/api/validate-token").send({token});

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(true);

  });

  it("should return false", async () => {
    const response = await supertest(app.server).post("/api/validate-token").send("notValid");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(false);
  });
});
