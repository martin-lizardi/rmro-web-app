import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Robot, RobotService } from 'src/app/core/services/robot/robot.service';

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.scss'],
})
export class RobotDetailsComponent implements OnInit {
  // robot: Robot;
  robot$!: Observable<Robot | null>;

  constructor(
    private route: ActivatedRoute,
    private robotService: RobotService
  ) {
    // this.robot = {
    //   alias: '',
    //   serial_number: '',
    //   model: '',
    //   logged: false,
    //   logged_dates: [],
    //   in_work: false,
    //   created_date: '',
    //   updated_date: '',
    // };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const { id: alias } = params;
      this.loadData(alias);
    });
  }

  private loadData(alias: string) {
    this.robot$ = this.robotService.robots$.pipe(
      map((robots) => {
        let robotData: Robot | null = null;
        robots.forEach((robot) => {
          if (robot.alias === alias) robotData = robot;
        });
        return robotData;
      })
    );
  }
}
