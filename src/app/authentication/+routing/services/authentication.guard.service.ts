import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, take} from "rxjs/operators";
import { AuthenticationState, getLoggedIn, getTokenExpiresIn, fromAuthentication } from 'app/authentication/+store';

@Injectable()
export class AuthenticationGuardService implements CanActivate, CanLoad {
  constructor(
    private store: Store<AuthenticationState>,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const currentUrl = route.url[0].path;
    return this.hasPermission(currentUrl);
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    const currentUrl = route.path;
    return this.hasPermission(currentUrl);
  }

  hasPermission(path: string) {
    return combineLatest(
      this.store.select(getLoggedIn),
      this.store.select(getTokenExpiresIn),
      (loggedIn, tokenExpiresIn) => {
        if (loggedIn) {
          if (path === 'auth') {
            this.router.navigate(['/', 'home']);
          }
          return true;
        } else {
          if (tokenExpiresIn) {
            if (tokenExpiresIn < Date.now()) {
              if (path === 'auth') {
                this.router.navigate(['/', 'home']);
              }
              return true;
            } else {
              this.store.dispatch(new fromAuthentication.Logout());
              return false;
            }
          } else {
            if (path === 'auth') {
              return true;
            }
            this.router.navigate(['/', 'auth']);
            return false;
          }
        }
      }).pipe(take(1));
  }
}
