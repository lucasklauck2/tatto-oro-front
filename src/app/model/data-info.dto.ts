export class DataInfoDTO {
  id: number;
  dia: Date;
  codigoCor: string;

  constructor(dia: Date, codigoCor: string) {
    this.dia = dia;
    this.codigoCor = codigoCor;
  }
}
