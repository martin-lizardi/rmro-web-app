import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Robot {
  alias: string;
  serial_number: string;
  model: string;
}

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  // private robotsDoc: AngularFirestoreDocument<Robot>;
  // robots$: Observable<Robot | undefined>;

  constructor(private afs: AngularFirestore) {
    // this.robotsDoc = afs.doc<Robot>('robots/test');
    // this.robots$ = this.robotsDoc.valueChanges();
  }

  createRobotTest(robot: Robot) {
    const { alias, serial_number, model } = robot;
    const robotsDoc = this.afs.doc<any>(`robots/${alias}`);
    return robotsDoc.set({ serial_number, model });
  }

  createRobot(robot: Robot) {
    const { alias, serial_number, model } = robot;
    return this.afs
      .collection('robots')
      .doc(alias)
      .set({ serial_number, model });
  }

  test() {
    // return this.afs.collection('robots').add({ xd: { lol: true } });
    return this.afs.collection('robots').doc('xd').set({ lol: true });
  }
}
