import { Injectable } from '@angular/core';
/*import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';*/
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
// import { Robot } from '../robot/robot.service';

@Injectable({
  providedIn: 'root',
})
export class ControlRobotService {
  private path = 'actions';
  // private robotDoc: AngularFirestoreDocument<Robot> | null;
  private realtimeDB!: AngularFireObject<any>;

  constructor(
    /*private afs: AngularFirestore, */ private db: AngularFireDatabase
  ) {
    // this.robotDoc = null;
  }

  init(alias: string) {
    // this.robotDoc = this.afs.collection<Robot>(`${this.path}`).doc(alias);
    this.realtimeDB = this.db.object(`${this.path}/${alias}`);
    return this.realtimeDB.set({ direction: '', control: false, robot: false });
  }

  clear() {
    return this.realtimeDB.update({ control: false });
  }

  // moveRobot(robot: Robot) {
  //   return this.robotDoc?.set(robot) || null;
  // }

  listener() {
    return this.realtimeDB.valueChanges();
  }

  start() {
    return this.realtimeDB.update({ control: true });
  }

  moveRobot(data: { direction: string; vX: number; vY: number }) {
    return this.realtimeDB == null ? null : this.realtimeDB.update(data);
  }
}
