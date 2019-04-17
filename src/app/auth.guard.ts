import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public user : UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.user.loggedIn()) {
        console.log('Usuario Logeado');
      
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        
        this.router.navigate(['Login'], { queryParams: { returnUrl: state.url }});
        console.log('Usuario NO Logeado');
     
        return false;
    }
 


}