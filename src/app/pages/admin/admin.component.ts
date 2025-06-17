import { Component, signal } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { AsideMenuComponent } from "../../components/aside-menu/aside-menu.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { MoviesManagementComponent } from "../../components/movies-management/movies-management.component";
import { iMovie } from '../../interfaces/movie.interface';
import { iUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-admin',
  imports: [
    FooterComponent,
    HeaderComponent,
    AsideMenuComponent,
    DashboardComponent,
    NgSwitch,
    NgSwitchCase,
    MoviesManagementComponent,
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeSection = signal<string>('dashboard');
  
  isLoadingDashboard = signal<boolean>(false);
  isLoadingMovieList = signal<boolean>(false);
  isLoadingUserList = signal<boolean>(false);
  dashboard = signal<iMovie[]>([]);
  movieList = signal<iMovie[]>([]);
  userList = signal<iUser[]>([]);

  onSectionSelected(section: string) {
    this.activeSection.set(section);
  }

  ngOnInit() {

  }
}
