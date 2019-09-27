import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  users: User[] = [];

 

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      surename: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]),
      bezeichnung: new FormControl('', [Validators.required])
    });
    this.getAllUsers();
  }

  // get name() { return this.userForm.get('name'); }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    this.create(this.userForm.value);
    this.userForm.reset();
  }

  public getAllUsers() {
    this.userService.getUsers().subscribe(res => {
      (this.users = res.map(e => {
        return {
          // id: e.payload.doc.data()['id'],
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          surename: e.payload.doc.data()['surename'],
          age: e.payload.doc.data()['age'],
          bezeichnung: e.payload.doc.data()['bezeichnung']
        };
      })),
        console.log(this.users);
    });
  }
  create(user: User) {
    return console.log(this.userService.createUser(user));
  }

  delete(id: string) {
    console.log('test1');
    console.log(this.userService.deleteUser(id));
    console.log('test2');
  }
}
