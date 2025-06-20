import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCollectionPlay, bootstrapPeople, bootstrapColumnsGap, bootstrapSliders, bootstrapBoxArrowRight } from '@ng-icons/bootstrap-icons';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { UserProfileComponent } from "./user-profile/user-profile.component"
import { LoginFormComponent } from "../forms/login-form/login-form.component";

@Component({
  selector: 'app-header',
  imports: [
    NgIcon,
    UserProfileComponent,
    LoginFormComponent
],
  viewProviders: [provideIcons({ bootstrapCollectionPlay, bootstrapPeople, bootstrapColumnsGap, bootstrapSliders, bootstrapBoxArrowRight })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showAdminPanel: boolean = false;
  showUserProfile: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.handleComponentVisibility();
    this.router.events.subscribe(() => {
      this.handleComponentVisibility();
    });
  }

  handleComponentVisibility() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('admin')) {
      this.showAdminPanel = true;
      this.showUserProfile = true;
    } else if (currentRoute.includes('movies')) {
      this.showAdminPanel = false;
      this.showUserProfile = true;
    } else {
      this.showAdminPanel = false;
      this.showUserProfile = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.toastr.success('Usuário desconectado com sucesso');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('Usuário desconetado ou Token inválido');
        this.router.navigate(['/login']);
      }
    });
  }
}