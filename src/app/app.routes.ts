import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RedirectGuard } from './guards/redirect.guard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LoadingComponent, canActivate: [RedirectGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'movies', canActivate: [AuthGuard], component: MoviesComponent },
  { path: 'admin', canActivate: [AuthGuard, RoleGuard], component: AdminComponent },
  { path: '**', component: NotFoundComponent }
];
