import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { authenticationGuard } from './guard/auth.guard';
import { RecipeDetailsComponent } from './features/recipes/recipe-details/recipe-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'signIn',
    component: LoginComponent,
    canActivate: [authenticationGuard()],
  },
  {
    path: 'signUp',
    component: RegisterComponent,
    canActivate: [authenticationGuard()],
  },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
