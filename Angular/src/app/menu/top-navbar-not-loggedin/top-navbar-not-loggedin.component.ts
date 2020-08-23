import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar-not-loggedin',
  templateUrl: './top-navbar-not-loggedin.component.html',
  styleUrls: ['./top-navbar-not-loggedin.component.css']
})
export class TopNavbarNotLoggedinComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
