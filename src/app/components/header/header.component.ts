import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCollectionPlay, bootstrapPeople, bootstrapColumnsGap, bootstrapSliders, bootstrapBoxArrowRight } from '@ng-icons/bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserProfileComponent } from "../user-profile/user-profile.component"
import { LoginFormComponent } from "../login-form/login-form.component";

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
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }
}