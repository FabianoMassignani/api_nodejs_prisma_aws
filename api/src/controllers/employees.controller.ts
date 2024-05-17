import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import {
  Employee,
  RequestgetEmployees,
} from "../interfaces/employees.interface";
import employeesService from "../services/employees.service";
import { CreateEmployeesDto } from "../dtos/employees.dto";

const employeesServiceInstance = new employeesService();

export const getEmployees = async (
  req: Request<{}, {}, {}, RequestgetEmployees>,
  res: Response,
  next: NextFunction
) => {
  const { orderBy = "nome", sortBy = "asc", search = "" } = req.query;

  if (!["nome", "idade", "cargo"].includes(orderBy)) {
    throw new Error("Invalid orderBy parameter.");
  }
  if (!["asc", "desc"].includes(sortBy)) {
    throw new Error("Invalid sortBy parameter.");
  }

  const employeesData: Employee[] =
    await employeesServiceInstance.findAllEmployees(search, orderBy, sortBy);

  res.status(200).json({ data: employeesData });
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const employeeId: string = req.params.id;

  if (!employeeId) {
    throw new BadRequestException("Id is required", ErrorCode.BAD_REQUEST);
  }

  const Employee: Employee = await employeesServiceInstance.findEmployeeById(
    employeeId
  );

  res.status(200).json({ data: Employee });
};

export const createEmployee = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const employeData: CreateEmployeesDto = req.body;

  if (!employeData.nome) {
    throw new BadRequestException("nome is required", ErrorCode.BAD_REQUEST);
  }

  if (!employeData.cargo) {
    throw new BadRequestException("cargo is required", ErrorCode.BAD_REQUEST);
  }

  if (!employeData.departamento) {
    throw new BadRequestException(
      "departamento is required",
      ErrorCode.BAD_REQUEST
    );
  }

  if (!employeData.dataAdmissao) {
    throw new BadRequestException(
      "dataAdmissao is required",
      ErrorCode.BAD_REQUEST
    );
  }

  const createEmployerData: Employee =
    await employeesServiceInstance.createEmployee(employeData);

  res
    .status(201)
    .json({ data: createEmployerData, message: "Criado com sucesso" });
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const employeeId: string = req.params.id;

  if (!employeeId) {
    throw new BadRequestException("Id is required", ErrorCode.BAD_REQUEST);
  }

  const employeData: CreateEmployeesDto = req.body;

  if (!employeData.nome) {
    throw new BadRequestException("nome is required", ErrorCode.BAD_REQUEST);
  }

  if (!employeData.cargo) {
    throw new BadRequestException("cargo is required", ErrorCode.BAD_REQUEST);
  }

  if (!employeData.departamento) {
    throw new BadRequestException(
      "departamento is required",
      ErrorCode.BAD_REQUEST
    );
  }

  if (!employeData.dataAdmissao) {
    throw new BadRequestException(
      "dataAdmissao is required",
      ErrorCode.BAD_REQUEST
    );
  }

  const updateEmployeeData: Employee =
    await employeesServiceInstance.updateEmployee(employeeId, employeData);

  res
    .status(200)
    .json({ data: updateEmployeeData, message: "Atualizado com sucesso" });
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const employeeId: string = req.params.id;

  if (!employeeId) {
    throw new BadRequestException("Id is required", ErrorCode.BAD_REQUEST);
  }

  const deleteUserData: Employee =
    await employeesServiceInstance.deleteEmployee(employeeId);

  res
    .status(200)
    .json({ data: deleteUserData, message: "Deletado com sucesso" });
};
