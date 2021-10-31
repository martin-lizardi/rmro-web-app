import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Robot } from '../robot/robot.service';

@Injectable({
  providedIn: 'root',
})
export class ControlRobotService {
  private path = 'robots';
  private robotDoc: AngularFirestoreDocument<Robot> | null;

  constructor(private afs: AngularFirestore) {
    this.robotDoc = null;
  }

  init(alias: string) {
    this.robotDoc = this.afs.collection<Robot>(`${this.path}`).doc(alias);
  }

  moveRobot(robot: Robot) {
    return this.robotDoc?.set(robot) || null;
  }
}
