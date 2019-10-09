import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { User } from './models/user';

@Injectable({
  providedIn: "root"
})
export class DataService {
  user: User;
  // private subject1 = new BehaviorSubject<string>("");
  // public content1 = this.subject1.asObservable();
  // private subject2 = new BehaviorSubject<string>("");
  // public content2 = this.subject2.asObservable();
  // private subject3 = new BehaviorSubject<number>(null);
  // public content3 = this.subject3.asObservable();
  // private subject4 = new BehaviorSubject<string>("");
  // public content4 = this.subject4.asObservable();
  // private subject5 = new BehaviorSubject<string>("");
  // public content5 = this.subject4.asObservable();

  private subject6 = new BehaviorSubject<User>(this.user);
  public content6 = this.subject6.asObservable();


  constructor() {}
  //Data Exchange of a data

  // sendDAta1(data1: string) {
  //   this.subject1.next(data1);
  // }
  // sendDAta2(data2: string) {
  //   this.subject2.next(data2);
  // }
  // sendDAta3(data3: number) {
  //   this.subject3.next(data3);
  // }
  // sendDAta4(data4: string) {
  //   this.subject4.next(data4);
  // }
  // sendDAta5(data5: string) {
  //   this.subject5.next(data5);
  // }

  //Data Exchange of an Object
  sendObject1(user: User) {
   return this.subject6.next(user);
  }
}
