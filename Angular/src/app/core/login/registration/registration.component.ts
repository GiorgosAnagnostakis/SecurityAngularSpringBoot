import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignUpRequest, AuthenticationControllerService } from 'src/swagger-generated';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Token } from 'src/app/models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  token: Token;
  roles: Array<String> = ['BUYER', 'SELLER'];

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private authControllerService: AuthenticationControllerService,
    private router: Router
    ) { }

  ngOnInit() {

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl(`/welcome`);
    }

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }


    signUp() {
      let signUpRequest: SignUpRequest = {};
      signUpRequest.username = this.registrationForm.value.username;
      signUpRequest.password = this.registrationForm.value.password;
      signUpRequest.role = this.registrationForm.value.roles;
  
      console.log(signUpRequest)
      this.authControllerService.signUpUserUsingPOST(signUpRequest).subscribe(data => {this.token = data;
        setTimeout(() => {
        this.router.navigateByUrl(`/login`);
      }, 500);
      })
    }

  }