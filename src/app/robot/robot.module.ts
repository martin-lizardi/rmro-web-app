import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { RobotRoutingModule } from './robot-routing.module';
import { CreateRobotComponent } from './components/create-robot/create-robot.component';
import { RobotDetailsComponent } from './components/robot-details/robot-details.component';

@NgModule({
  declarations: [CreateRobotComponent, RobotDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RobotRoutingModule,
  ],
})
export class RobotModule {}
