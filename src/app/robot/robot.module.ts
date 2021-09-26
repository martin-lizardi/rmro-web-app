import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { RobotRoutingModule } from './robot-routing.module';
import { CreateRobotComponent } from './components/create-robot/create-robot.component';

@NgModule({
  declarations: [CreateRobotComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RobotRoutingModule,
  ],
})
export class RobotModule {}
