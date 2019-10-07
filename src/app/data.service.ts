import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private subject = new Subject<any>();
  // public dataSource = new BehaviorSubject('');
  // currentData = this.dataSource.asObservable();

  constructor() { }

  sendDAta1(data1: string) {
     this.subject.next(data1);
  }
  receiveData(): Observable<any> {
    return this.subject.asObservable();
  }
}
