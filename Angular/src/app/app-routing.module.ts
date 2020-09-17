import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './core/login/registration/registration.component';
import { RoleGuard } from './services/role.guard';
import { ProductListComponent } from './products/product-list/product-list.component';
import { BuyerProductListComponent } from './products/buyer/buyer-product-list/buyer-product-list.component';
import { AccessdeniedComponent } from './core/accessdenied/accessdenied/accessdenied.component';


const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent},

  { path: 'products', component: ProductListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ROLE_SELLER','ROLE_ADMIN'] } },
    
  { path: 'buyerproducts', component: BuyerProductListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ROLE_BUYER','ROLE_ADMIN'] } },

  { path: 'accessDenied', component: AccessdeniedComponent},
  { path: 'welcome', component: WelcomeComponent,
  canActivate: [RoleGuard],
  data: { expectedRole: ['ROLE_ADMIN'] }}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

