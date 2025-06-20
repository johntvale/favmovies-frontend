import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { iconsList } from '../../../shared/constants/profile-icons.constants';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  imports: [
    NgClass
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userName: string = '';
  userRole: string = '';
  profileIcons = iconsList
  isLoadingIcon: boolean = true;
  selectedIcon = {
    url: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=user1',
    bgClass: 'bg-gray-500'
  }

  constructor(
    private AuthService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.AuthService.getCurrentUser().subscribe({
      next: (userData) => {
        this.userName = userData.user.name.split(" ")[0] || 'Usuário';
        this.userRole = userData.user.role.split(" ")[0] || 'Visitante';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to fetch user data', error);
        this.toastr.error('Erro ao buscar dados do usuário');
      }
    });

    this.isLoadingIcon = true;
    const index = Math.floor(Math.random() * this.profileIcons.length);
    this.selectedIcon = this.profileIcons[index];
    this.isLoadingIcon = false;
  }
}
