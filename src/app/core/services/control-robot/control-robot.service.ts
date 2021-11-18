import { Injectable } from '@angular/core';
/*import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';*/
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { Robot } from '../robot/robot.service';

@Injectable({
  providedIn: 'root',
})
export class ControlRobotService {
  private path = 'actions';
  // private robotDoc: AngularFirestoreDocument<Robot> | null;
  private realtimeDB!: AngularFireObject<any>;

  constructor(
    /*private afs: AngularFirestore, */
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    // this.robotDoc = null;
  }

  init(alias: string) {
    // this.robotDoc = this.afs.collection<Robot>(`${this.path}`).doc(alias);
    this.realtimeDB = this.db.object(`${this.path}/${alias}`);
    return this.realtimeDB.set({
      direction: '',
      control: false,
      robot: false,
      arm: false,
    });
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

  changeArm(data: { arm: boolean; activatedArm?: boolean; magnet?: boolean }) {
    return this.realtimeDB == null ? null : this.realtimeDB.update(data);
  }

  activateArm(data: { activatedArm: boolean }) {
    return this.realtimeDB == null ? null : this.realtimeDB.update(data);
  }

  changeMagnet(data: { magnet: boolean }) {
    return this.realtimeDB == null ? null : this.realtimeDB.update(data);
  }

  takePicture(data: { camera: { take_picture: true; uploaded: false } }) {
    return this.realtimeDB == null ? null : this.realtimeDB.update(data);
  }

  loadedPicture(data: { camera: { uploaded: false } }) {
    return this.realtimeDB == null ? null : this.realtimeDB.update(data);
  }

  fetchPicture(path: string) {
    const storageRef = this.storage.ref(path);
    return storageRef.getDownloadURL();
  }
}
