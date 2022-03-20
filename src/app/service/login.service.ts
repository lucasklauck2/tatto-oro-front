import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { RetornoAutenticacaoDTO } from './../model/retorno-autenticacao.dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}

  login(usuario: string, senha: string) {
    this.httpClient
      .post<RetornoAutenticacaoDTO>(this.baseUrl + 'login', {
        usuario: usuario,
        senha: senha,
      })
      .subscribe(
        (retorno) => {
          if (!retorno) {
            return;
          }

          sessionStorage.setItem('Authorization', retorno.Authorization);

          this.router.navigate(['inicio']);

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Logado com sucesso!',
            life: 3000,
          });
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Dados inválidos!',
            life: 3000,
          })
      );
  }

  estaLogado() {
    const token = sessionStorage.getItem('Authorization');

    return !!token;
  }

  sair(mostrarMensagem = true) {
    sessionStorage.removeItem('Authorization');

    if (mostrarMensagem) {
      this.messageService.add({
        severity: 'info',
        summary: 'Deslogado',
        detail: 'Até mais :(',
      });
    }

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }
}
