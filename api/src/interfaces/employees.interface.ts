export interface Employee {
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: Date;
}

export interface RequestgetEmployees {
  orderBy?: "nome" | "cargo" | "departamento" | "dataAdmissao";
  sortBy?: "asc" | "desc";
  search?: string;
}
