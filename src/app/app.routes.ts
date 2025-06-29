import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RedirectGuard } from './guards/redirect.guard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MoviesManagementComponent } from './components/movies-management/movies-management.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';

export const routes: Routes = [
  { path: '', component: LoadingComponent, canActivate: [RedirectGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'movies', canActivate: [AuthGuard], component: MoviesComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'movies-management', component: MoviesManagementComponent },
      { path: 'users-management', component: UsersManagementComponent },
      { path: 'user-preferences', component: UserPreferencesComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];
