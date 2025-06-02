import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegexPatterns } from '../../shared/constants/regex.constants';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    NgClass
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

  onSubmitLogin() {
    console.log('Login form submitted:', this.loginForm);
    this.loginForm.reset();
  }
  
  onSubmitRegister() {
    console.log('Register form submitted:', this.registerForm);
    this.registerForm.reset();
  }
}
