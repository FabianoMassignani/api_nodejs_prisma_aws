import { model, Schema, Document } from "mongoose";
import { Employee } from "../interfaces/employees.interface";

const employeesSchema: Schema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    cargo: {
      type: String,
      required: true,
      trim: true,
    },
    departamento: {
      type: String,
      required: true,
      trim: true,
    },
    dataAdmissao: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const employeesModel = model<Employee & Document>(
  "Employees",
  employeesSchema
);

export default employeesModel;
