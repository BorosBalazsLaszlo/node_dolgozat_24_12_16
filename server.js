import express from "express";
import cors from "cors";
import fs from "fs/promises";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import carsRoute from "./routes/car.js";
import { DbInit } from "./database.js";
import { readFile } from "fs";
import { start } from "repl";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", carsRoute);

async function startServer() {
  try {
    await DbInit();
    app.listen(PORT, () => {
      console.log(`A szerver megy a https://localhost${PORT} címen.`);
    });
  } catch (err) {
    console.error(err)
    console.log("Hiba merült fel a szerver indításánál.");
  }
}

startServer();
