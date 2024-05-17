export interface OrderParams {
  orderBy: string;
  sortBy: string;
}

export const getOrderParams = (sortBy: string): OrderParams => {
  switch (sortBy) {
    case "nomeasc":
      return { orderBy: "nome", sortBy: "asc" };
    case "nomedesc":
      return { orderBy: "nome", sortBy: "desc" };
    case "cargoasc":
      return { orderBy: "cargo", sortBy: "asc" };
    case "cargodesc":
      return { orderBy: "cargo", sortBy: "desc" };
    case "departamentoasc":
      return { orderBy: "departamento", sortBy: "asc" };
    case "departamentodesc":
      return { orderBy: "departamento", sortBy: "desc" };
    case "dataAdmissaoasc":
      return { orderBy: "dataAdmissao", sortBy: "asc" };
    case "dataAdmissaodesc":
      return { orderBy: "dataAdmissao", sortBy: "desc" };
    default:
      return { orderBy: "nome", sortBy: "asc" };
  }
};
