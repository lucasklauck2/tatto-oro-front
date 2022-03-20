import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../../../../service/usuario.service';

@Component({
  selector: 'app-alteracao-senha',
  templateUrl: './alteracao-senha.component.html',
  styleUrls: ['./alteracao-senha.component.scss'],
})
export class AlteracaoSenhaComponent implements OnInit {
  form: FormGroup;

  fb = new FormBuilder();

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      senhaAntiga: ['', [Validators.required, Validators.minLength(5)]],
      senhaNova: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  alterarSenha() {
    this.usuarioService
      .alterarSenha(
        this.form.get('senhaAntiga')?.value,
        this.form.get('senhaNova')?.value
      )
      .subscribe(() => {
        this.ref.close();

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Senha alterada com sucesso!',
          life: 3000,
        });
      });
  }
}
