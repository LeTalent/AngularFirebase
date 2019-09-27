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



@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
editForm: FormGroup;
submitted = false;
emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      surename: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required, Validators.maxLength(3)]),
      bezeichnung: new FormControl("", [Validators.required])
    });
  }
  get name() { return this.editForm.get('name'); }

  onSubmit(editForm: FormGroup) {
    console.log(this.update(this.editForm.value));
    // this.router.navigate(["user-list"]);
  }

  update(user: User) {
    this.userService.updateUser(user);
  }
}
