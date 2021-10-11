import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  private clearUser() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userData = this.storageService.user;
    return this.authService.hasUser().pipe(
      map((user) => {
        if (user === null || userData === null) {
          this.authService.logout();
          return true;
        }
        return this.router.parseUrl('/home');
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userData = this.storageService.user;
    return this.authService.hasUser().pipe(
      map((user) => {
        if (user === null || userData === null) {
          this.authService.logout();
          return this.router.parseUrl('/login');
        }
        return true;
      })
    );
  }
}
