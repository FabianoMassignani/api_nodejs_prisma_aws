export async function getEmployees() {
  try {
    let employees = await fetch("http://localhost:3001/api/employees");

    return employees.json();
  } catch (error: any) {
    console.error(error);
  }
}
