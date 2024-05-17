export class CreateEmployeesDto {
    public nome: string;
    public cargo: string;
    public departamento: string;
    public dataAdmissao: Date;
  
    constructor(nome: string, cargo: string, departamento: string, dataAdmissao: Date) {
      this.nome = nome;
      this.cargo = cargo;
      this.departamento = departamento;
      this.dataAdmissao = dataAdmissao;
    }
  }
  