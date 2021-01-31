import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate, CanDeactivate<ComponentCanDeactivate>  {

  constructor(private router: Router, private loginService: AuthService ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const routePath = state.url; // 'candidates'
    console.log(routePath)
      if (!this.loginService.isAuthenticated()) {
          // this.loginService.logOut();
          if (routePath != '/login' && routePath != '/signup') {
              this.router.navigateByUrl('/login');
              return false;
          }
          return true;
      } else {
          if (routePath == '/login' || routePath == '/signup') {
              this.router.navigateByUrl('/moment');
              return false;
          }

          return true;
      }

  }

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
      return component.canDeactivate() ? true :
          confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
  }
}
