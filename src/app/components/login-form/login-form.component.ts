import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { RegexPatterns } from '../../shared/constants/regex.constants';
import { AuthService } from '../../services/auth.service';
import { iResponseAuthWithUser } from '../../interfaces/auth.intercace';

@Component({
  selector: 'app-login-form',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(RegexPatterns.password)
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      this.toastr.error('Preencha os campos de login corretamente.', 'Formulário inválido');
      return;
    }

    const credentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value!.password!
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.toastr.success('Login realizado com sucesso!');
        this.authService.getCurrentUser().subscribe({
          next: (response: iResponseAuthWithUser) => {
            if (response.user.role === 'admin') this.router.navigate(['/admin']);
            else if (response.user.role === 'user') this.router.navigate(['/movies']);
            else this.router.navigate(['/']);
          },
        });
      },
      error: (error) => {
        if (error.status === 401) this.toastr.error("Usuário ou Senha inválidos.");
        if (error.status === 404) this.toastr.error("Usuário não encontrado.");
        this.toastr.error(error.error.message);
      }
    });

    this.loginForm.reset();
  }

}
