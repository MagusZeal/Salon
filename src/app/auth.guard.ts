import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(private router: Router, public user : UserService) { }

    canLoad(route: Route): boolean {
    
        let url: string = route.path;
        console.log('Url:'+ url);
        if (url) {
            console.log('not logged in');
            
        this.router.navigate(['Login'])
          return false;
        }  
        console.log('logged in');
        
        return true; 
      }
 


}