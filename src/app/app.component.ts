import { Component, OnInit } from "@angular/core";
import { User } from "./models/user";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  // users: User[] = [];
  users: User[] = [] ;
  // users: Array<any>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  // public getAllUsers() {
  //   this.userService.getUsers().subscribe(res => {
  //     this.users = res.map(e => {
  //       return {
  //         id: e.payload.doc.id,
  //         ...e.payload.doc.data()
  //       } as User;
  //     })
  //     console.log(this.users);
  //   });
  // }
  public getAllUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res.map(e => {
        return {
          id: e.payload.doc.data()['id'],
          name: e.payload.doc.data()['name'],
          surename: e.payload.doc.data()['surename'],
          age: e.payload.doc.data()['age'],
          bezeichnung: e.payload.doc.data()['bezeichnung']
        }
      }),
      console.log(this.users);
    });
  }
  create(user: User) {
    this.userService.createUser(user);
  }

  update(user: User) {
    this.userService.updateUser(user);
  }

  delete(id: string) {
    console.log("test1");
    console.log(this.userService.deleteUser(id));
    console.log("test2");
  }
}
