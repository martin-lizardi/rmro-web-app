import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Robot, RobotService } from 'src/app/core/services/robot/robot.service';
import { ConfirmAlertComponent } from 'src/app/shared/components/confirm-alert/confirm-alert.component';

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

  constructor(private robotService: RobotService, private dialog: MatDialog) {
    this.displayedColumns = ['alias', 'model', 'serial_number', 'actions'];
    this.robots$ = this.robotService.robots$;
  }

  ngOnInit(): void {}

  openDeleteAlert(alias: string) {
    const dialogRef = this.dialog.open(ConfirmAlertComponent, {
      data: {
        type: 'warning',
        title: 'Eliminar robot',
        content: '¿Seguro quiere eliminarlo?',
      },
    });
    dialogRef.afterClosed().subscribe((r) => {
      if (r.delete === true) {
        this.robotService.deleteRobot(alias);
      }
    });
  }
}
