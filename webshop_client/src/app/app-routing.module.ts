import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {CartComponent} from './cart/cart.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {LogoutComponent} from './logout/logout.component'
import { AuthGuard } from './guard/auth.guard';
import {ProductAComponent} from './product-a/product-a.component'

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent,  canActivate: [AuthGuard]},
  {path: 'product-a/:category', component: ProductAComponent, canActivate: [AuthGuard]},
  {path: 'mycart', component: CartComponent,  canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
