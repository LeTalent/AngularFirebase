import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private userService: UserService,
    private router: Router,
    private dataServ: DataService
  ) {}

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surename: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(3)
      ]),
      bezeichnung: new FormControl('', [Validators.required])
    });
  }
  get name() {
    return this.editForm.get('name');
  }

  get sureName() {
    return this.editForm.get('surename');
  }

  get age() {
    return this.editForm.get('age');
  }

  get bezeichnung() {
    return this.editForm.get('bezeichnung');
  }

  onSubmit(editForm: FormGroup) {
    this.submitted = true;
    console.log(this.update(this.editForm.value));
    // this.router.navigate(["user-list"]);
  }

  update(user: User) {
    this.userService.updateUser(user);
  }
}
