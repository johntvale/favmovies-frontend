import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegexPatterns } from '../../shared/constants/regex.constants';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

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

}
