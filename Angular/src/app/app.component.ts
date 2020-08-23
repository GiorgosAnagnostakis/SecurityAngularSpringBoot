import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Subscription } from 'rxjs';
import { JwtPayload } from './models/jwt-payload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentJwtPayload: JwtPayload;


  constructor(private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
      if (!this.authenticationService.currentJwtPayload) {
        console.log('test')
        this.router.navigate(["/login"]);
      }
  }

  loggedIn() {
    return this.authenticationService.isLoggedIn();
  }
 
  
}
