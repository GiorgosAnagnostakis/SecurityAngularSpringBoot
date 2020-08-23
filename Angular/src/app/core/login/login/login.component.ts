import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationControllerService, LoginRequest} from 'src/swagger-generated';
import { Token } from 'src/app/models/token';
import * as jwt_decode from 'jwt-decode';
import { JwtPayload } from 'src/app/models/jwt-payload';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
 // loginRequest: LoginRequest = {};
 token: Token;

 public href: string = "";

  constructor(
    private fb: FormBuilder,
    private authControllerService: AuthenticationControllerService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    if (this.authenticationService.isLoggedIn()) {
      this.navigate();
    }


    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      if (token != null){
      this.authenticationService.setSession(token);
      this.navigate();
      }
    });
 }

  login() {
    let loginRequest: LoginRequest = {};
    loginRequest.username = this.loginForm.value.username;
    loginRequest.password = this.loginForm.value.password;

    this.authControllerService.authenticateUserUsingPOST(loginRequest).subscribe(data => {this.token = data; this.authenticationService.setSession(this.token.accessToken); 
        this.navigate();
    })
  }

  signUp() {
    this.router.navigateByUrl(`/signup`);
  }

  navigate() {
    if (this.authenticationService.currentJwtPayloadValue.roles.includes('ROLE_SELLER') ) {
      this.router.navigateByUrl(`/products`)

    } else if (this.authenticationService.currentJwtPayloadValue.roles.includes('ROLE_BUYER') ) {
      this.router.navigateByUrl(`/buyerproducts`)
    }
  }
  
  
}

