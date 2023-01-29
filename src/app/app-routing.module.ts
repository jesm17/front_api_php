import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FavoritesComponent } from './components/user/favorites/favorites.component';
import { MyInformationComponent } from './components/user/my-information/my-information.component';
import { PokemonsComponent } from './components/user/pokemons/pokemons.component';
import { GuardGuard } from './guardian/guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pokemons', component: PokemonsComponent, canActivate: [GuardGuard] },
  {
    path: 'my-favorites',
    component: FavoritesComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'my-information',
    component: MyInformationComponent,
    canActivate: [GuardGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
