import { Injectable } from '@angular/core';
import { of as ObservableOf, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, switchMap} from 'rxjs/operators'
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn: Boolean;
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        this.isLoggedIn = false;
        return null;
      } else {
        this.isLoggedIn = true;
        return authState.uid;
      }
    }),
  )
  isAdmin: Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if (!uid) {
        return ObservableOf(false);
      } else {
        return this.db.object<boolean>('/permisos/admin/' + uid).valueChanges();
      }
    })
  );
  isOwner:Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if (!uid) {
        return ObservableOf(false);
      } else {
        return this.db.object<boolean>('/permisos/owner/' + uid).valueChanges();
      }
    })
  );


  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }
  login(email, password) {
    console.log(email, password);

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['']);
    this.isLoggedIn=true;

  }
loggedIn(){
 return this.isLoggedIn;
}
  // loginGoogle() {
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }
  logout() {
    console.log('hola');
    this.isLoggedIn = false;
    this.afAuth.auth.signOut();
  
  }
  
  passwordRecovery(email: string){
   console.log(email);
   return this.afAuth.auth.sendPasswordResetEmail(email)
   .then(() => console.log('sent Password Reset Email!'))
   .catch((error) => console.log(error))
  }

}
