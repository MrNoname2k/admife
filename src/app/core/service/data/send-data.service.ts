import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendDataService {
  private emailSubject = new BehaviorSubject<string>('');
  email$ = this.emailSubject.asObservable();

  setEmail(email: string) {
    this.emailSubject.next(email);
  }

  private dataSubject = new BehaviorSubject<any>('');
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

  private postSubject = new BehaviorSubject<any>('');
  post$ = this.postSubject.asObservable();

  setPost(data: any) {
    this.postSubject.next(data);
  }

  private notification = new BehaviorSubject<any>('');
  notification$ = this.postSubject.asObservable();

  setNotification(data: any) {
    this.postSubject.next(data);
  }
}
