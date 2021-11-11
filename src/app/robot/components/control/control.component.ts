import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ControlRobotService } from 'src/app/core/services/control-robot/control-robot.service';
import { Robot, RobotService } from 'src/app/core/services/robot/robot.service';

// var joy = new JoyStick('joyDiv');
declare const JoyStick: any;
declare const document: Document;
// https://fmoralesdev.com/2019/10/23/using-external-js-files-in-angular/
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit, OnDestroy {
  robot!: Robot;
  control$!: Observable<any>;
  loading: boolean;
  loadingControl: boolean;
  success: boolean;
  robotOnline: boolean;
  isArm: boolean;
  activatedArm: boolean;
  isMagnet: boolean;
  private joystick: {
    element: any;
    listener: any;
    direction: any;
    vX: number;
    vY: number;
  };

  constructor(
    private route: ActivatedRoute,
    private robotService: RobotService,
    private controlRobotService: ControlRobotService
  ) {
    this.loading = true;
    this.loadingControl = true;
    this.success = false;
    this.robotOnline = false;
    this.isArm = false;
    this.activatedArm = false;
    this.isMagnet = false;
    this.joystick = {
      element: null,
      listener: null,
      direction: null,
      vX: 0,
      vY: 0,
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const { id: alias } = params;
      this.fetchRobot(alias);
    });
  }

  private fetchRobot(alias: string) {
    this.robotService
      .findRobot(alias)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (robot) => {
          this.robot = robot;
          this.initControl(alias);
          this.success = true;
        },
        (err) => {
          this.success = false;
        }
      );
  }

  ngOnDestroy(): void {
    clearInterval(this.joystick.listener);
    this.controlRobotService.clear();
  }

  private startControl() {
    this.controlRobotService.start();
  }

  private getVelocity(val: number) {
    const result = Math.trunc((val * 255) / 100);
    return result > 255 ? 255 : result < -255 ? -255 : result;
  }

  private buidlJoystick() {
    if (this.joystick.element != null) {
      return;
    }
    setTimeout(() => {
      const joy = new JoyStick('joyDiv');
      this.joystick.element = joy;
      this.joystick.listener = setInterval(() => {
        const dir = joy.GetDir();
        const vX = this.getVelocity(joy.GetX());
        const vY = this.getVelocity(joy.GetY());

        if ((dir != this.joystick.direction || vX != this.joystick.vX) &&
          !this.isArm) {
          this.move(dir, vX, vY);
        }
      }, 500);
    }, 1000);
  }

  private clearJoystick() {
    this.joystick = {
      element: null,
      listener: null,
      direction: null,
      vX: 0,
      vY: 0,
    };
  }

  async move(direction: string, vX: number, vY: number) {
    try {
      const res = await this.controlRobotService.moveRobot({
        direction,
        vX,
        vY,
      });
      this.joystick = {
        ...this.joystick,
        direction,
        vX,
        vY,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async changeArm() {
    try {
      const res = await this.controlRobotService.changeArm({
        arm: !this.isArm,
        activatedArm: false,
        magnet: false,
      });
      this.isArm = !this.isArm;
      this.activatedArm = false;
      this.isMagnet = false;
    } catch (error) {
      console.log(error);
    }
  }

  async activateArm() {
    try {
      const res = await this.controlRobotService.activateArm({
        activatedArm: !this.activatedArm
      });
      this.activatedArm = !this.activatedArm;
    } catch (error) {
      console.log(error);
    }
  }

  async changeMagnet() {
    try {
      const res = await this.controlRobotService.changeMagnet({
        magnet: !this.isMagnet
      });
      this.isMagnet = !this.isMagnet;
    } catch (error) {
      console.log(error);
    }
  }

  isOnline() {
    return this.joystick.element != null;
  }

  private initControl(alias: string) {
    this.controlRobotService.init(alias);
    this.control$ = this.controlRobotService.listener().pipe(
      map((res) => {
        this.robotOnline = res.control && res.robot;
        if (this.robotOnline) {
          this.buidlJoystick();
        } else {
          this.clearJoystick();
        }
        return res;
      })
    );
    this.startControl();
  }
}
