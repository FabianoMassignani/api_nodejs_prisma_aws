import { Employee } from "../interfaces/employees.interface";
import employeesModel from "../models/employees.model";
import { InternalException } from "../exceptions/internal-exception";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { CreateEmployeesDto } from "../dtos/employees.dto";
import { isEmpty } from "../utils/util";

export interface EmployeesServiceInterface {
  findAllEmployees(
    search: string,
    orderBy: string,
    sortBy: string
  ): Promise<Employee[]>;
  findEmployeeById(employeeId: string): Promise<Employee>;
  createEmployee(employeeData: CreateEmployeesDto): Promise<Employee>;
  updateEmployee(
    employeeId: string,
    employeeData: CreateEmployeesDto
  ): Promise<Employee>;
  deleteEmployee(employeeId: string): Promise<Employee>;
}

class EmployeesService implements EmployeesServiceInterface {
  public employees = employeesModel;

  public async findAllEmployees(
    search: string = "",
    orderBy: string = "nome",
    sortBy: string = "asc"
  ): Promise<Employee[]> {
    let query: any = {};

    if (search) {
      query = {
        $or: [
          { nome: { $regex: search, $options: "i" } },
          { cargo: { $regex: search, $options: "i" } },
          { departamento: { $regex: search, $options: "i" } },
        ],
      };
    }

    let employees: Employee[];

    const sortByValue = orderBy === "asc" ? 1 : -1;

    if (orderBy && sortBy) {
      employees = await this.employees
        .find(query)
        .sort({ [sortBy]: sortByValue });
    } else {
      employees = await this.employees.find(query);
    }

    return employees;
  }

  public async findEmployeeById(employeeId: string): Promise<Employee> {
    if (isEmpty(employeeId)) {
      throw new NotFoundException(
        "Employee id is required",
        ErrorCode.NOT_FOUND
      );
    }

    const employee = await this.employees.findOne({ _id: employeeId });

    if (!employee) {
      throw new NotFoundException(
        `Employee with id ${employeeId} not found`,
        ErrorCode.NOT_FOUND
      );
    }

    return employee as Employee;
  }

  public async createEmployee(
    employeeData: CreateEmployeesDto
  ): Promise<Employee> {
    if (isEmpty(employeeData)) {
      throw new BadRequestException(
        "Employee data is required",
        ErrorCode.BAD_REQUEST
      );
    }

    const newEmployee = await this.employees.create(employeeData);

    if (!newEmployee) {
      throw new InternalException(
        "Failed to create employee",
        ErrorCode.INTERNAL_SERVER,
        null
      );
    }

    return newEmployee as Employee;
  }

  public async updateEmployee(
    employeeId: string,
    employeeData: CreateEmployeesDto
  ): Promise<Employee> {
    if (isEmpty(employeeId)) {
      throw new NotFoundException(
        "Employee id is required",
        ErrorCode.NOT_FOUND
      );
    }

    if (isEmpty(employeeData)) {
      throw new BadRequestException(
        "Employee data is required",
        ErrorCode.BAD_REQUEST
      );
    }

    const updatedEmployee = await this.employees.findByIdAndUpdate(
      employeeId,
      employeeData,
      { new: true }
    );

    if (!updatedEmployee) {
      throw new NotFoundException(
        `Employee with id ${employeeId} not found`,
        ErrorCode.NOT_FOUND
      );
    }

    return updatedEmployee as Employee;
  }

  public async deleteEmployee(employeeId: string): Promise<Employee> {
    if (isEmpty(employeeId)) {
      throw new NotFoundException(
        "Employee ID is required",
        ErrorCode.NOT_FOUND
      );
    }

    const deletedEmployee = await this.employees.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      throw new NotFoundException(
        `Employee with id ${employeeId} not found`,
        ErrorCode.NOT_FOUND
      );
    }

    return deletedEmployee as Employee;
  }
}

export default EmployeesService;
