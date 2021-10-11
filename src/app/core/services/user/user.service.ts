import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  email: string;
  uid: string;
  refreshToken: string;
}

export interface UserDB {
  email: string;
  uid: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private path: string;

  constructor(private afs: AngularFirestore) {
    this.path = 'users';
  }

  getUser(uid: string) {
    return this.afs
      .collection(`${this.path}`)
      .doc(`${uid}`)
      .snapshotChanges()
      .pipe(map((action) => action.payload.data() as UserDB));
  }
}
