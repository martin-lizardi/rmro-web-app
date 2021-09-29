import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Robot {
  alias: string;
  serial_number: string;
  model: string;
  logged: boolean;
  logged_dates: string[];
  in_work: boolean;
  created_date: string;
  updated_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  private path = 'robots';
  private robotsCollection: AngularFirestoreCollection<Robot>;
  robots$!: Observable<Robot[]>;

  constructor(private afs: AngularFirestore) {
    this.robotsCollection = afs.collection<Robot>(`${this.path}`);
    this.getRobots();
  }

  private getRobots() {
    this.robots$ = this.afs
      .collection(`${this.path}`)
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Robot))
      );
  }

  createRobot(robot: Robot) {
    return this.robotsCollection.doc(robot.alias).set(robot);
  }

  deleteRobot(alias: string) {
    return this.robotsCollection.doc(alias).delete();
  }

  test() {
    // return this.afs.collection('robots').add({ xd: { lol: true } });
    const algo = this.afs.collection('robots');
    console.log(algo);
  }
}
