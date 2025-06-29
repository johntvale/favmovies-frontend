import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { iResponseBasicUser, iUser } from './../../interfaces/user.interface';
import { LoadingComponent } from '../loading/loading.component';
import { AuthService } from '../../services/auth.service';
import { RegexPatterns } from '../../shared/constants/regex.constants';

@Component({
  selector: 'app-user-preferences',
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.css'
})
export class UserPreferencesComponent {
  isLoadingUserPreferences = false;
  isEditingPreferences = false;

  userData = signal<iUser | null>(null);
  currentUserId = '';
  isSaveButtonDisabled = true;

  userPreferencesForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern(RegexPatterns.password),
    ]),
    keepPassword: new FormControl(true)
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isLoadingUserPreferences = true;
    this.getUserLoggedIn();
    this.handleFormChanges();
    this.updateKeepPasswordState();
  }
  
  handleFormChanges() {
    this.userPreferencesForm.get('keepPassword')?.valueChanges.subscribe(() => {
      this.updatePasswordValidators();
      this.updateSaveButtonState();
    });
  
    this.userPreferencesForm.valueChanges.subscribe(() => {
      this.updateSaveButtonState();
    });
  }

  updateSaveButtonState() {
    const form = this.userPreferencesForm;
    const keepPassword = form.get('keepPassword')?.value;
  
    const isNameEmailValid =
      form.get('name')?.valid && form.get('email')?.valid;
  
    this.isSaveButtonDisabled = keepPassword
      ? !isNameEmailValid
      : !form.valid;
  }

  getUserLoggedIn() {
    this.authService.getCurrentUser().subscribe({
      next: ({ user }) => {
        this.currentUserId = user.id;
        this.getUserData(user.id);
      },
      error: () => {
        this.toastr.error('Erro ao carregar usuário autenticado.');
        this.isLoadingUserPreferences = false;
      }
    });
  }

  getUserData(userId: string) {
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        this.userData.set(response);
        this.updateFormFromUserData();
        this.userPreferencesForm.disable();
        this.updateKeepPasswordState();
      },
      error: () => {
        this.toastr.error('Erro ao carregar dados do usuário.');
      },
      complete: () => {
        this.isLoadingUserPreferences = false;
      }
    });
  }

  updateFormFromUserData() {
    this.userPreferencesForm.patchValue({
      name: this.userData()?.name,
      email: this.userData()?.email,
      password: this.userData()?.password,
      keepPassword: true
    });

    this.updatePasswordValidators();
    this.updateKeepPasswordState();
  }

  updatePasswordValidators() {
    const keepPassword = this.userPreferencesForm.get('keepPassword')?.value;
    const passwordControl = this.userPreferencesForm.get('password');
  
    if (!passwordControl) return;
  
    if (keepPassword) {
      passwordControl.clearValidators();
      passwordControl.disable();
    } else {
      passwordControl.setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(RegexPatterns.password),
      ]);
      passwordControl.enable();
    }
  
    passwordControl.updateValueAndValidity();
  }

  updateKeepPasswordState() {
    const keepPasswordControl = this.userPreferencesForm.get('keepPassword');

    if (!keepPasswordControl) return;

    if (this.isEditingPreferences) {
      keepPasswordControl.enable();
    } else {
      keepPasswordControl.disable();
    }
  }

  openEditMode() {
    this.isEditingPreferences = true;
    this.userPreferencesForm.enable();
    this.updateKeepPasswordState();
    this.updatePasswordValidators();
  }

  closeEditMode() {
    this.isEditingPreferences = false;
    this.userPreferencesForm.disable();
    this.updateFormFromUserData();
    this.updateKeepPasswordState();
  }

  savePreferences() {
    let valuesToUpdate;
    if (this.userPreferencesForm.value.keepPassword) {
      valuesToUpdate = {
        name: this.userPreferencesForm.value.name,
        email: this.userPreferencesForm.value.email,
      };
    } else {
      valuesToUpdate = {
        name: this.userPreferencesForm.value.name,
        email: this.userPreferencesForm.value.email,
        password: this.userPreferencesForm.value.password
      };
    }

    this.userService.updateUserData(valuesToUpdate as iUser, this.currentUserId).subscribe({
      next: (response: iResponseBasicUser) => {
        if (response.message.includes('success')) {
          this.toastr.success('Dados atualizados com sucesso.');
          this.getUserLoggedIn();
          this.userPreferencesForm.disable();
          this.isEditingPreferences = false;
          this.updateKeepPasswordState();
        } else {
          this.toastr.warning('Algo inesperado aconteceu.');
        }
      },
      error: () => {
        this.toastr.error('Erro ao atualizar os dados. Tente novamente.');
      }
    });
  }
}