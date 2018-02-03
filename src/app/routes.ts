import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/regster.guard'; 
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path:'register', component: RegisterComponent, canActivate: [RegisterGuard]},
    {path:'login', component: LoginComponent},
    {path: 'add-client', component : AddClientComponent, canActivate: [AuthGuard]},
    {path: 'clients-details/:id', component : ClientDetailsComponent, canActivate: [AuthGuard]},
    {path: 'edit-client/:id', component : EditClientComponent, canActivate: [AuthGuard]},
    {path: 'settings', component : SettingsComponent, canActivate : [AuthGuard]},
    {path: '**', component:PageNotFoundComponent}
];