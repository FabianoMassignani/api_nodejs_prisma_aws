import { Router } from "express";

import { errorHandler } from "../middlewares/errorHandler";
import { getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee 
 } from "../controllers/employees.controller";

const router: Router = Router();

router.get("/", errorHandler(getEmployees));
router.get("/getById/:id", errorHandler(getEmployeeById));
router.post("/", errorHandler(createEmployee));
router.put("/:id", errorHandler(updateEmployee));
router.delete("/:id", errorHandler(deleteEmployee));

export default router;
