import { Employee } from "../../types";

export async function getEmployees() {
  try {
    const hostApi = process.env.API_URL;

    const response = await fetch(`${hostApi}/api/employees`);

    return response.json();
  } catch (error: any) {
    console.error(error);
  }
}

export async function addEmployee(employee: Employee) {
  try {
    const hostApi = process.env.API_URL;

    const response = await fetch(`${hostApi}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    return response.json();
  } catch (error: any) {
    console.error(error);
  }
}

export async function updateEmployee(id: string, employee: Employee) {
  try {
    const hostApi = process.env.API_URL;

    const response = await fetch(`${hostApi}/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    return response.json();
  } catch (error: any) {
    console.error(error);
  }
}

export async function deleteEmployee(id: string) {
  try {
    const hostApi = process.env.API_URL;

    const response = await fetch(`${hostApi}/api/employees/${id}`, {
      method: "DELETE",
    });

    return response.json();
  } catch (error: any) {
    console.error(error);
  }
}
