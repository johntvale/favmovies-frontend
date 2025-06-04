import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RegexPatterns } from '../../shared/constants/regex.constants';

@Component({
  selector: 'app-login',
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
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

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(RegexPatterns.password),
    ]),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
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
          next: (user: any) => {
            if (user.role === 'admin') this.router.navigate(['/admin']);
            else if (user.role === 'user') this.router.navigate(['/movies']);
            else this.router.navigate(['/']);
          },
        });
      },
    });

    this.loginForm.reset();
  }
  
  onSubmitRegister() {
    if (this.registerForm.invalid) {
      this.toastr.error('Preencha os campos de registro corretamente.', 'Formulário inválido');
      return;
    }

    const userData = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };

    this.userService.register(userData).subscribe({
      next: () => {
        this.toastr.success('Conta criada com sucesso!');
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Erro no registro');
      }
    });

    this.registerForm.reset();
  }
}
