import { Injectable } from '@angular/core';
import { of as ObservableOf, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, switchMap } from 'rxjs/operators'
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { HttpClient } from '@angular/common/http';



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
  isOwner: Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if (!uid) {
        return ObservableOf(false);
      } else {
        return this.db.object<boolean>('/permisos/owner/' + uid).valueChanges();
      }
    })
  );


  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router, private http: HttpClient) { }
  login(email, password) {


    this.afAuth.auth.signInWithEmailAndPassword(email, password);


  }

  singup(email, password, trabajadora) {


    var user = this.afAuth.auth.currentUser;
    console.log(this.afAuth.auth.currentUser);

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
     console.log(this.afAuth.auth.currentUser.uid);
  
        this.addEmployee(trabajadora,this.afAuth.auth.currentUser.uid).subscribe();
        console.log('si')
        this.logout();

        this.afAuth.auth.updateCurrentUser(user)

      })
      .catch((error) => {
        console.log(error)

      });


  }
  // loginGoogle() {
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }
  logout() {
    console.log('hola');
    this.isLoggedIn = false;
    this.afAuth.auth.signOut();

  }

  passwordRecovery(email: string) {
    console.log(email);
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => console.log(error))
  }

  addEmployee(trabajadora,id) {

    return this.http.put<any[]>(`trabajadoras/${id}.json?`, trabajadora);

   
  }
}
