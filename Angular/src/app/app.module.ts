import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './core/login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticationService } from './services/authentication.service';
import { TopNavbarComponent } from './menu/top-navbar/top-navbar.component';
import { TopNavbarNotLoggedinComponent } from './menu/top-navbar-not-loggedin/top-navbar-not-loggedin.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { AuthenticationControllerService, ProductControllerService } from 'src/swagger-generated';
import { RegistrationComponent } from './core/login/registration/registration.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CrudProductComponent } from './products/crud-product/crud-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from './products/confirmation-modals/confirm-delete/confirm-delete.component';
import { BuyerProductListComponent } from './products/buyer/buyer-product-list/buyer-product-list.component';
import { BuyerProductFormComponent } from './products/buyer/buyer-product-form/buyer-product-form.component';
import { BuyerCrudProductComponent } from './products/buyer/buyer-crud-product/buyer-crud-product.component';
import { TransactionControllerService } from 'src/swagger-generated/api/transactionController.service';
import { AccessdeniedComponent } from './core/accessdenied/accessdenied/accessdenied.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegistrationComponent,
    TopNavbarComponent,
    TopNavbarNotLoggedinComponent,
    ProductListComponent,
    ProductFormComponent,
    CrudProductComponent,
    ConfirmDeleteComponent,
    BuyerProductListComponent,
    BuyerProductFormComponent,
    BuyerCrudProductComponent,
    AccessdeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    ProductListComponent,
    ProductFormComponent,
    CrudProductComponent,
    BuyerProductListComponent,
    BuyerProductFormComponent,
    BuyerCrudProductComponent,
  ],
  entryComponents: [ 
    ProductListComponent,
    ProductFormComponent,
    CrudProductComponent,
    ConfirmDeleteComponent,
    BuyerProductListComponent,
    BuyerProductFormComponent,
    BuyerCrudProductComponent,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },   
    AuthenticationService,
    AuthenticationControllerService,
    ProductControllerService,
    TransactionControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
