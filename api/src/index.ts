import express, { Express } from "express";
import cors from "cors";
import connectDB from "./config/database";

import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMidleware } from "./middlewares/errorMidleware";

const app: Express = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", rootRouter);

app.use(errorMidleware);

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
