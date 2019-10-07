import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { User } from "./models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(public db: AngularFirestore) {}

  getUsers() {
    return this.db.collection<User>("users").snapshotChanges();
  }
  createUser(user: User) {
    return this.db.collection("users").add(user);
  }
  updateUser(user: User) {
    delete user.id;
    this.db.doc("users/" + user.id).update(user);
  }
  deleteUser(userId: string) {
    return this.db.doc("users/" + userId).delete();
  }
}
