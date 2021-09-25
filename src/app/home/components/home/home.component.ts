import { Component, OnInit } from '@angular/core';

export interface RobotRow {
  id: string;
  alias: string;
  model: string;
  serial_number: string;
}

const ELEMENT_DATA: RobotRow[] = [
  { id: '1', alias: 'Equipo 1', model: 'XCL-01', serial_number: '145' },
  { id: '2', alias: 'Equipo 2', model: 'XCL-01', serial_number: '146' },
  { id: '3', alias: 'Equipo 4', model: 'XCL-01', serial_number: '148' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'alias', 'model', 'serial_number'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
