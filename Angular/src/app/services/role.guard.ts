import { Injectable } from "@angular/core";
import {
  CanLoad,
  Router,
  Route,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanLoad, CanActivate {
    
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(route: Route) {
    const expectedRoles = route.data.expectedRole;
    const currentRoles = this.authenticationService.currentJwtPayloadValue
      ? this.authenticationService.currentJwtPayloadValue.roles
      : null;

    if (
      !this.authenticationService.currentJwtPayloadValue ||
      !this.roleIsIncluded(expectedRoles, currentRoles)
    ) {
      this.router.navigate(["accessDenied"]);
      return false;
    }
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const expectedRoles = route.data.expectedRole;
    const currentRoles = this.authenticationService.currentJwtPayloadValue
      ? this.authenticationService.currentJwtPayloadValue.roles
      : null;
    if (
      !this.authenticationService.currentJwtPayloadValue ||
      !this.roleIsIncluded(expectedRoles, currentRoles)
    ) {
      this.router.navigate(["accessDenied"]);
      return false;
    }
    return true;
  }

  private roleIsIncluded(
    expectedRoles: string[],
    currentRoles: string[]
  ): boolean {
    return currentRoles.some(currentrole =>
      expectedRoles.includes(currentrole)
    );
  }
}