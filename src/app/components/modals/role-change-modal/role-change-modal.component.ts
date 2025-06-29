import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { iBasicUser, iResponseBasicUser } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-change-modal',
  imports: [CommonModule],
  templateUrl: './role-change-modal.component.html',
  styleUrl: './role-change-modal.component.css'
})
export class RoleChangeModalComponent {
  @Input() selectedUser!: Signal<iBasicUser | null>;
  @Input() closeRoleChangeModal!: () => void;
  @Input() typeOfChange: string = 'promotion';
  @Output() roleChangeCompleted = new EventEmitter<void>();

  userLoggedIn = signal<iBasicUser>({ id: '', name:'', email: '', role: 'user'});

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService
  ){}

  ngOnInit(){
    this.getUserLoggedIn();
  }

  getUserLoggedIn(){
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        this.userLoggedIn.set(response.user);
      },
      error: () => {
        console.log('erro ao verificar qual usuário está logado.')
      }
    });
  }

  promoteToAdmin() {
    if (this.userLoggedIn().id !== this.selectedUser()?.id) {
      this.userService.promoteUserToAdmin(this.selectedUser()?.id!).subscribe({
        next: (response: iResponseBasicUser) => {
          if (response.message.includes('success')) {
            this.toastr.success(`${this.selectedUser()!.name} Promovido(a) com sucesso.`)
            this.closeModal();
            this.roleChangeCompleted.emit()
          }
        },
        error: () => {
          this.toastr.error('Erro ao promover usuário(a). Tente novamente mais tarde.');
        }
      });
    } else {
      this.toastr.error('Não é possível Promover a si mesmo(a).');
    }
  }

  demoteToUser() {
    if (this.userLoggedIn().id !== this.selectedUser()!.id) {
      this.userService.demoteAdminToUser(this.selectedUser()!.id).subscribe({
        next: (response: iResponseBasicUser) => {
          if (response.message.includes('success')) {
            this.toastr.success(`${this.selectedUser()!.name} Rebaixado(a) com sucesso.`)
            this.closeModal();
            this.roleChangeCompleted.emit();
          }
        },
        error: () => {
          this.toastr.error('Erro ao rebaixar usuário(a). Tente novamente mais tarde.');
        }
      });
    } else {
      this.toastr.error('Não é possível Rebaixar a si mesmo(a).');
    }
  }

  closeModal() {
    this.closeRoleChangeModal();
  }

}
