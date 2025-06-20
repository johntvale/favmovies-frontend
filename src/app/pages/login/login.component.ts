import { Component } from '@angular/core';

import { FooterComponent } from "../../components/footer/footer.component";
import { RegisterFormComponent } from "../../components/forms/register-form/register-form.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-login',
  imports: [
    FooterComponent,
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
