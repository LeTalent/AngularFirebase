import { Injectable, ChangeDetectionStrategy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from './models/user';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
// import firestore from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  ref = firebase.firestore().collection('users');
  userDoc: AngularFirestoreDocument<User>;
  user: User;

  constructor(public db: AngularFirestore) {}

  getUsers() {
    return this.db.collection<User>('users').snapshotChanges();
  }

  createUser(user: User) {
    return this.db.collection('users').add(user);
  }
  // updateUser(user: User) {
  //   this.userDoc = this.db.doc(`users/${user.id}`);
  //   this.userDoc.set(user);
  // }
  // updateUser(id: string, data) {
  //   // console.table(data);
  //   return new Observable((observer) => {
  //     this.ref.doc(id).update(data).then(() => {
  //       observer.next();
  //     });
  //   });
  // }
  updateUser(user: User) {
    delete user.id;
    this.db.doc('users/' + user.id).update(user);
  }

  deleteUser(userId: string) {
    return this.db.doc('users/' + userId).delete();
  }
}
