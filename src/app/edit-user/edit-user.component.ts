import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { User } from "../models/user";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DataService } from "../data.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  text1 = "";
  text2 = "";
  text3;
  text4 = "";
  text5 = "";
  user: User;
  users: User[];

  constructor(
    private userService: UserService,
    private router: Router,
    private dataServ: DataService
  ) {
    // this.dataServ.content1.subscribe(x => (this.text1 = x));
    // this.dataServ.content2.subscribe(x => (this.text2 = x));
    // this.dataServ.content3.subscribe(x => (this.text3 = x));
    // this.dataServ.content4.subscribe(x => (this.text4 = x));
    // this.dataServ.content5.subscribe(x => (this.text5 = x));
    this.dataServ.content6.subscribe(res => (this.user = res) as User);
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      surename: new FormControl("", [Validators.required]),
      age: new FormControl("", [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(3)
      ]),
      bezeichnung: new FormControl("", [Validators.required])
    });
  }
  get name() {
    return this.editForm.get("name");
  }

  get sureName() {
    return this.editForm.get("surename");
  }

  get age() {
    return this.editForm.get("age");
  }

  get bezeichnung() {
    return this.editForm.get("bezeichnung");
  }

  // update(user: User) {
  //   this.submitted = true;
  //   console.log(this.user);
  //   this.userService.updateUser(this.user);
  //   console.log(this.user);
  //   this.router.navigate(["user-list"]);
  // }
  // update(user: User) {
  //   console.log(this.user);
  //   this.userService.updateUser(user.id, this.user).subscribe(
  //     res => {
  //       this.router.navigate(["/user-list"]);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  //   console.log(this.user);
  // }
  update(user: User) {
    console.log(this.user);
    this.userService.updateUser(user);
    console.log(this.user);
    this.router.navigate(["/user-list"]);
  }
}
