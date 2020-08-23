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
  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent},

  { path: 'products', component: ProductListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ROLE_SELLER'] } },
    
  { path: 'buyerproducts', component: BuyerProductListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ROLE_BUYER'] } },

  { path: 'accessDenied', component: AccessdeniedComponent},
  { path: 'welcome', component: WelcomeComponent}
 ,



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

