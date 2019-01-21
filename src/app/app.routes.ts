import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { ShowAllResolver } from './show-all/show-all.resolver';
import { AuthGuard } from './services/auth-guard.service';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'new-user', canActivate: [AuthGuard], component: NewUserComponent },
  { path: 'details2/:id', canActivate: [AuthGuard], component: ShowAllComponent, resolve:{data: ShowAllResolver } },
  { path: 'details/:id', canActivate: [AuthGuard], component: EditUserComponent, resolve:{data : EditUserResolver} }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
