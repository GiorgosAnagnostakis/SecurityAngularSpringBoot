import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { JwtPayload } from '../models/jwt-payload';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentJwtPayload: Observable<JwtPayload>;
  private currentJwtPayLoadSubject: BehaviorSubject<JwtPayload>;

  public get currentJwtPayloadValue(): JwtPayload {
    return this.currentJwtPayLoadSubject.value;
  }
  
  constructor() {
    this.currentJwtPayLoadSubject = new BehaviorSubject<JwtPayload>(
      JSON.parse(localStorage.getItem("currentJwtPayload"))
    );
    this.currentJwtPayload = this.currentJwtPayLoadSubject.asObservable();
   }






logout() {
  localStorage.removeItem('currentJwtPayload');
  this.currentJwtPayLoadSubject.next(null);
  //this.currentProfileSubject.next(null);
}

setSession(accessToken: any): JwtPayload {
  const decodedToken = this.getDecodedAccessToken(accessToken);
  const jwtPayload: JwtPayload = {
    roles: decodedToken.roles,
    username: decodedToken.username,
    //user: decodedToken.user,
    iat: decodedToken.iat,
    exp: decodedToken.exp,
    accessToken
  };
  localStorage.setItem('currentJwtPayload', JSON.stringify(jwtPayload));
  console.log(jwtPayload.roles)
 // localStorage.setItem('profile', JSON.stringify(jwtPayload.user.profile));
  this.currentJwtPayLoadSubject.next(jwtPayload);
 // this.currentProfileSubject.next(jwtPayload.user.profile);
  return jwtPayload;
}

getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
}

isLoggedIn() {
  if (localStorage.getItem('currentJwtPayload') != null){
    return true;
  }
  return false;
}



}