import { ChangeDetectorRef, Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { AsideMenuComponent } from "../../components/aside-menu/aside-menu.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { MoviesManagementComponent } from "../../components/movies-management/movies-management.component";

@Component({
  selector: 'app-admin',
  imports: [
    FooterComponent,
    HeaderComponent,
    AsideMenuComponent,
    DashboardComponent,
    NgSwitch,
    NgSwitchCase,
    MoviesManagementComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeSection = 'dashboard';

  onSectionSelected(section: string) {
    this.activeSection = section;
  }
}
