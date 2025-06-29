import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { AsideMenuComponent } from "../../components/aside-menu/aside-menu.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { MoviesManagementComponent } from "../../components/movies-management/movies-management.component";
import { UsersManagementComponent } from "../../components/users-management/users-management.component";
import { UserPreferencesComponent } from "../../components/user-preferences/user-preferences.component";

@Component({
  selector: 'app-admin',
  imports: [
    FooterComponent,
    HeaderComponent,
    AsideMenuComponent,
    DashboardComponent,
    CommonModule,
    MoviesManagementComponent,
    UsersManagementComponent,
    UserPreferencesComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeSection = signal<string>('dashboard');

  onSectionSelected(section: string) {
    this.activeSection.set(section);
  }

  ngOnInit() {

  }
}
