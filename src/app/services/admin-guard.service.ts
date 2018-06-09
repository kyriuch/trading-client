import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../modules/profile/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.getAuthUser().pipe(
      map(authUser => {
        if (!authUser) {
          this.router.navigateByUrl('/login');

          return false;
        }

        return authUser.roles.indexOf('Admin') >= 0;
      })
    );
  }
}
