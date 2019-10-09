import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { UserService } from "../user.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  users: User[] = [];
  user: User;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataServ: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      surename: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      age: new FormControl("", {
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(2)
        ]
      }),
      bezeichnung: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });
    this.getAllUsers();
  }
  get name() {
    return this.userForm.get("name");
  }

  get sureName() {
    return this.userForm.get("surename");
  }

  get age() {
    return this.userForm.get("age");
  }

  get bezeichnung() {
    return this.userForm.get("bezeichnung");
  }
  // get name() { return this.userForm.get('name'); }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    this.create(this.userForm.value);
    this.userForm.reset("");
  }

  public getAllUsers() {
    this.userService.getUsers().subscribe(res => {
      (this.users = res.map(e => {
        return {
          // id: e.payload.doc.data()['id'],
          id: e.payload.doc.id,
          name: e.payload.doc.data()["name"],
          surename: e.payload.doc.data()["surename"],
          age: e.payload.doc.data()["age"],
          bezeichnung: e.payload.doc.data()["bezeichnung"]
        };
      })),
        console.table(this.users);
    });
  }

  create(user: User) {
    return console.log(this.userService.createUser(user));
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Do you really want to delete this Card?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Yes clicked");
        this.userService.deleteUser(id);
      }
    });
  }
  // editUser(arg1, arg2, arg3, arg4) {
  //   this.router.navigate(["edit-user"]);
  //   console.log(this.user);
  //   this.dataServ.sendDAta1(arg1);
  //   this.dataServ.sendDAta2(arg2);
  //   this.dataServ.sendDAta3(arg3);
  //   this.dataServ.sendDAta4(arg4);
  // }
  editUser(user) {
    this.router.navigate(["edit-user"]);
    console.log(user);
    // this.dataServ.sendDAta1(user.name);
    // this.dataServ.sendDAta2(user.surename);
    // this.dataServ.sendDAta3(user.age);
    // this.dataServ.sendDAta4(user.bezeichnung);
    // this.dataServ.sendDAta5(user.id);
    this.dataServ.sendObject1(user);
  }
}
