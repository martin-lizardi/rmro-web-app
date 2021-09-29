import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Robot, RobotService } from 'src/app/core/services/robot/robot.service';

export interface RobotRow {
  alias: string;
  model: string;
  serial_number: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[];
  robots$: Observable<Robot[]>;

  constructor(private robotService: RobotService) {
    this.displayedColumns = ['alias', 'model', 'serial_number'];
    this.robots$ = this.robotService.robots$;
  }

  ngOnInit(): void {}
}
