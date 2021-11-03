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
  myJoystick: any;
  joystickListener: any;
  loading: boolean;
  success: boolean;

  constructor(
    private route: ActivatedRoute,
    private robotService: RobotService,
    private controlRobotService: ControlRobotService
  ) {
    this.loading = true;
    this.success = false;
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.joystickListener);
    console.log('DEATH');
  }

  private buidlJoystick() {
    setTimeout(() => {
      var joy = new JoyStick('joyDiv');
      this.myJoystick = joy;
      // this.myJoystick = {
      //   element: joy,
      //   inputPosX: '',
      //   inputPosY: '',
      //   direzione: '',
      //   x: '',
      //   y: '',
      // };
      this.joystickListener = setInterval(() => {
        // const { element } = this.myJoystick;
        // this.myJoystick = {
        //   ...this.myJoystick,
        //   inputPosX: element.GetPosX(),
        //   inputPosY: element.GetPosY(),
        //   direzione: element.GetDir(),
        //   x: element.GetX(),
        //   y: element.GetY(),
        // };
        // console.log('DIR', this.myJoystick.GetDir());

        // if (this.myJoystick.GetDir() != 'C')
        this.move(this.myJoystick.GetDir());
      }, 800);
      console.log(joy);
    }, 2000);
  }

  async move(direction: string) {
    try {
      const res = await this.controlRobotService.moveRobot({
        ...this.robot,
        // in_work: true,
        actions: direction,
      });
      // document?.getElementById('joystick')?.parentNode?.removeChild(document?.getElementById('joystick'));
      // console.log(res);
    } catch (error) {
      console.log(error);

      // alert('ERR');
    }
  }
}
