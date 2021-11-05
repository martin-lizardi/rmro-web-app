import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
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
  joystick: {
    element: any;
    listener: any;
    status: any;
  };
  loading: boolean;
  success: boolean;

  constructor(
    private route: ActivatedRoute,
    private robotService: RobotService,
    private controlRobotService: ControlRobotService
  ) {
    this.loading = true;
    this.success = false;
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
          console.log('RES', robot);
          this.robot = robot;
          this.controlRobotService.init(alias);
          this.success = true;
          this.buidlJoystick();
        },
        (err) => {
          this.success = false;
        }
      );
  }

  ngOnDestroy(): void {
    clearInterval(this.joystick.listener);
  }

  private buidlJoystick() {
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
      }, 800);
    }, 2000);
  }

  async move(direction: string) {
    try {
      const res = await this.controlRobotService.moveRobot(direction);
      console.log(direction);
      this.joystick.status = direction;
    } catch (error) {
      console.log(error);
    }
  }
}
