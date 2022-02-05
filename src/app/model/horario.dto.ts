export class HorarioDTO {
  id: number;
  nomeCliente: string;
  horarioInicio: Date;
  horarioTermino: Date;
  observacoes: string;
  numeroTelefone: string;
  local: string;
  codigoCor: string;

  constructor(
    id: number,
    nomeCliente: string,
    horarioInicio: Date,
    horarioTermino: Date,
    observacoes: string,
    numeroTelefone: string,
    local: string,
    codigoCor: string
  ) {
    this.id = id;
    this.nomeCliente = nomeCliente;
    this.horarioInicio = horarioInicio;
    this.horarioTermino = horarioTermino;
    this.observacoes = observacoes;
    this.local = local;
    this.codigoCor = codigoCor;
    this.numeroTelefone = numeroTelefone;
  }
}
