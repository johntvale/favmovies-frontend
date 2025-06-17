import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';
import { RegexPatterns } from '../../shared/constants/regex.constants';

@Component({
  selector: 'app-register-form',
  imports: [
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
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

  constructor(private userService: UserService, private toastr: ToastrService) {}

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
