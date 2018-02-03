import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';



@Injectable()
export class AuthServiceService {

  constructor(
    public afAuth: AngularFireAuth
  ) {}
  //logged in user
  login(email: string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData), err => reject(err));
    });
  }

  //get auth
  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }
  logout(){
    return this.afAuth.auth.signOut();
  }
  register(email:string, password:string){
    return new Promise((resolve, reject ) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => resolve(user), err => reject(err));
    })
  }
}
