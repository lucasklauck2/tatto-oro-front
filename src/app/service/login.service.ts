import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  iat1 = 'ahfuaf3541543545411@##@@###@@4d5ef4e';
  uat1 = 'guioro';
  pat1 = 'tattoo11552244@';

  iat2 = '2e2ejhu2@##245454512!!@#dDwdwdw';
  uat2 = 'mariavit';
  pat2 = 'vitoria11552244@';

  constructor(private router: Router, private messageService: MessageService) {}

  login(usuario: string, senha: string) {
    if (usuario === this.uat1 && senha === this.pat1) {
      sessionStorage.setItem('usuario', this.iat1);

      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 500);

      this.messageService.add({
        severity: 'success',
        summary: 'Login',
        detail: 'Logado com sucesso!',
        life: 3000,
      });

      return;
    }

    if (usuario === this.uat2 && senha === this.pat2) {
      sessionStorage.setItem('usuario', this.iat2);

      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 500);

      this.messageService.add({
        severity: 'success',
        summary: 'Login',
        detail: 'Logado com sucesso!',
        life: 3000,
      });

      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Dados inválidos!',
      life: 3000,
    });
  }

  estaLogado() {
    const token = sessionStorage.getItem('usuario');

    if (token === this.iat1 || token === this.iat2) {
      return true;
    }

    return false;
  }

  sair() {
    sessionStorage.removeItem('usuario');

    this.messageService.add({
      severity: 'info',
      summary: 'Deslogado',
      detail: 'Até mais :(',
    });

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }
}
