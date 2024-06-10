import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private userId = new BehaviorSubject('Wonderful User');
  getUserId = this.userId.asObservable();

  constructor() { }

  setUserId(userId: string){
    this.userId.next(userId);
  }

}
