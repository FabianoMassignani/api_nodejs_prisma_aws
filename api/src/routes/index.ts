import { Router } from "express";

import employeesRouter from "./employees";

const rootRouter: Router = Router();

rootRouter.use("/employees", employeesRouter);

export default rootRouter;
