import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, HostListener, signal } from '@angular/core';

import { iBasicUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from "../pagination/pagination.component";
import { RoleChangeModalComponent } from "../modals/role-change-modal/role-change-modal.component";

@Component({
  selector: 'app-users-management',
  imports: [FormsModule, LoadingComponent, CommonModule, PaginationComponent, RoleChangeModalComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent {
  userList = signal<iBasicUser[]>([]);
  totalAdmins = signal<Number>(0);
  totalRegularUsers = signal<Number>(0);
  filteredUserList: iBasicUser[] = [];
  filteredAndPaginatedUserList: iBasicUser[] = [];
  isLoadingUserList: boolean = false;

  selectedUser = signal<iBasicUser | null>(null);

  userSearch: string = '';
  lastUserSearch: string = '';

  currentPage: number = 1;
  limitUsersPerPage: number = 10;
  totalUsers: number = 0;
  totalPages: number = 0;

  isRoleChangeModalOpen: boolean = false;
  typeOfChange: string = 'promotion';

  constructor(
    private userService: UserService,
  ){}

  ngOnInit() {
    this.getUserList();
  }
  
  getUserList(){
    this.isLoadingUserList = true;
    this.userService.getUserList().subscribe({
      next: (users) => {
        let adminsCount = 0;
        this.userList.set(users);
        users.forEach(user => {
          if (user.role.toLowerCase() === 'admin') adminsCount += 1
        })
        this.totalAdmins.set(adminsCount);
        this.totalRegularUsers.set(users.length - adminsCount );
        this.filterUserList();
        this.isLoadingUserList = false;
      },
      error: () => {
        console.error('Erro ao carregar lista de usuários');
      }
    });
  }

  filterUserList() {
    this.filteredUserList = this.userList().filter(user => user.name.toLowerCase().includes(this.userSearch.toLowerCase()));
    this.lastUserSearch = this.userSearch;
    this.userSearch = '';
    this.currentPage = 1;
    this.paginateUserList();
  }

  clearSearch() {
    this.userSearch = '';
    this.filterUserList();
  }

  paginateUserList() {
    this.totalUsers = this.filteredUserList.length;
    this.totalPages = Math.ceil(this.totalUsers / this.limitUsersPerPage);
  
    const startIndex = (this.currentPage - 1) * this.limitUsersPerPage;
    const endIndex = startIndex + this.limitUsersPerPage;
  
    this.filteredAndPaginatedUserList = this.filteredUserList.slice(startIndex, endIndex);
  }

  handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginateUserList();
  }

  openRoleChangeModal(user: iBasicUser, currentType: string) {
    this.isRoleChangeModalOpen = true;
    this.typeOfChange = currentType;
    this.selectedUser.set(user);
  }

  closeRoleChangeModal() {
    this.isRoleChangeModalOpen = false;
    this.selectedUser.set(null);
  }

  getRowNumber(index: number): number {
    return (this.currentPage - 1) * this.limitUsersPerPage + index + 1;
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.closeRoleChangeModal();
  }

}
