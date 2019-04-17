import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'salon';
  constructor(public user : UserService , public afAuth: AngularFireAuth, private router: Router){}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate([''])
      } else {
        this.router.navigate(['/Login'])
      }
    });
  }
}
