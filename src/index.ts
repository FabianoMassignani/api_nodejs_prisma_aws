import express, { Express, Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./secrets";
import rootRouter from "./routes";

const app: Express = express();

app.use(cors());

app.use("api", rootRouter);

export const prisma = new PrismaClient({
  log: ["query"],
});

app.listen(PORT, () => {
  console.log("Server is running on port 3002");
});
