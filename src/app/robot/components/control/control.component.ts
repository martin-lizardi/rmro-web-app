import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
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
  private joystick: {
    element: any;
    listener: any;
    status: any;
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
    this.joystick = {
      element: null,
      listener: null,
      status: null,
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
  }

  private startControl() {
    this.controlRobotService.start();
  }

  private buidlJoystick() {
    if (this.joystick.element != null) {
      return;
    }
    setTimeout(() => {
      const joy = new JoyStick('joyDiv');
      this.joystick.element = joy;
      this.joystick.listener = setInterval(() => {
        // this.joystick.element = {
        //   ...this.joystick.element,
        //   inputPosX: element.GetPosX(),
        //   inputPosY: element.GetPosY(),
        //   direzione: element.GetDir(),
        //   x: element.GetX(),
        //   y: element.GetY(),
        // };

        const dir = joy.GetDir();
        if (dir != this.joystick.status) {
          this.move(dir);
        }
      }, 500);
    }, 2000);
  }

  private clearJoystick() {
    this.joystick = {
      element: null,
      listener: null,
      status: null,
    };
  }

  async move(direction: string) {
    try {
      const res = await this.controlRobotService.moveRobot(direction);
      this.joystick.status = direction;
    } catch (error) {
      console.log(error);
    }
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
