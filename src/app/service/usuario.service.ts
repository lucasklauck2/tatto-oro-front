import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AlteracaoSenhaDTO } from './../model/alteracao-senha.dto';
import { RetornoAutenticacaoDTO } from '../model/retorno-autenticacao.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}

  alterarSenha(senhaAntiga: string, novaSenha: string): Observable<void> {
    const alteracaoSenha = new AlteracaoSenhaDTO(senhaAntiga, novaSenha);

    return this.httpClient.post<void>(
      this.baseUrl + 'usuario/alterarSenha',
      alteracaoSenha
    );
  }
}
