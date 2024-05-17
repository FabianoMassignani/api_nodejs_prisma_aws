import { Employee } from "../../types";

export async function getEmployees(
  search?: string,
  sortBy?: string,
  orderBy?: string
): Promise<{ data: Employee[] }> {
  try {
    const hostApi = process.env.API_URL;

    let url = `${hostApi}/api/employees`;

    if (sortBy) {
      url += `?sortBy=${sortBy}`;
    }

    if (orderBy) {
      url += `&orderBy=${orderBy}`;
    }

    if (search) {
      url += `&search=${search}`;
    }

    const response = await fetch(url);

    return response.json();
  } catch (error) {
    return { data: [] };
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
    return { data: {} };
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
    return { data: {} };
  }
}

export async function deleteEmployee(id: string) {
  try {
    const hostApi = process.env.API_URL;

    const response = await fetch(`${hostApi}/api/employees/${id}`, {
      method: "DELETE",
    });

    return response.json();
  } catch (error: any) {}
}
