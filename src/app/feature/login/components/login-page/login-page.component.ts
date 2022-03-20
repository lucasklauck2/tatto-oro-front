import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../../../../service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  fb = new FormBuilder();

  form: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (this.loginService.estaLogado()) {
      this.router.navigate(['/inicio']);
    }

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    this.loginService.login(
      new String(this.form.value.usuario).toLowerCase(),
      this.form.value.senha
    );
  }
}
