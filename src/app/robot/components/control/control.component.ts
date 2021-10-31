import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ControlRobotService } from 'src/app/core/services/control-robot/control-robot.service';
import { Robot, RobotService } from 'src/app/core/services/robot/robot.service';

// var joy = new JoyStick('joyDiv');
declare const JoyStick: any;
// https://fmoralesdev.com/2019/10/23/using-external-js-files-in-angular/
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  robot$!: Observable<Robot | null>;

  constructor(
    private route: ActivatedRoute,
    private robotService: RobotService,
    private controlRobotService: ControlRobotService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const { id: alias } = params;
      try {
        this.robot$ = this.robotService.findRobot(alias);
        this.controlRobotService.init(alias);
        console.log('LOL', JoyStick);
        // var joy = new JoyStick('joyDiv');
      } catch (error) {
        alert('Err');
      }
    });
  }

  async move(robot: Robot, direction: string) {
    try {
      const res = await this.controlRobotService.moveRobot({
        ...robot,
        // in_work: true,
        actions: direction,
      });
      console.log(res);
    } catch (error) {
      console.log(error);

      alert('ERR');
    }
  }
}
