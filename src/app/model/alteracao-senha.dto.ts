export class AlteracaoSenhaDTO {
  senhaAntiga: string;
  senhaNova: string;

  constructor(senhaAntiga: string, senhaNova: string) {
    this.senhaAntiga = senhaAntiga;
    this.senhaNova = senhaNova;
  }
}
