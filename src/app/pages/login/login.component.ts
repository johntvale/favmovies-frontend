import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RegexPatterns } from '../../shared/constants/regex.constants';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-login',
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    HeaderComponent,
    RegisterFormComponent,
    HeaderComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor() {}  
}
