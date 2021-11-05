import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Robot } from '../robot/robot.service';

@Injectable({
  providedIn: 'root',
})
export class ControlRobotService {
  private path = 'actions';
  private robotDoc: AngularFirestoreDocument<Robot> | null;
  private realtimeDB: AngularFireObject<any>;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.robotDoc = null;
    this.realtimeDB = db.object(this.path);
  }

  init(alias: string) {
    this.robotDoc = this.afs.collection<Robot>(`${this.path}`).doc(alias);
  }

  // moveRobot(robot: Robot) {
  //   return this.robotDoc?.set(robot) || null;
  // }

  moveRobot(action: string) {
    return this.realtimeDB.set(action);
  }
}
