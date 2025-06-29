import { Component } from '@angular/core';

import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { AsideMenuComponent } from "../../components/aside-menu/aside-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    FooterComponent,
    HeaderComponent,
    AsideMenuComponent,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {}
