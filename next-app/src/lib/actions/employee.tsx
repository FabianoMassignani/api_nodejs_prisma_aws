import { Employee } from "../../types";

export async function getEmployees() {
  try {
    let employees = await fetch("http://localhost:3001/api/employees");

    return employees.json();
  } catch (error: any) {
    console.error(error);
  }
}

export async function addEmployee(employee: Employee) {
  try {
    await fetch("http://localhost:3001/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
  } catch (error: any) {
    console.error(error);
  }
}

export async function updateEmployee(id: string, employee: Employee) {
  try {
    await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
  } catch (error: any) {
    console.error(error);
  }
}

export async function deleteEmployee(id: string) {
  try {
    await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: "DELETE",
    });
  } catch (error: any) {
    console.error(error);
  }
}