import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './components/control/control.component';
import { CreateRobotComponent } from './components/create-robot/create-robot.component';
import { RobotDetailsComponent } from './components/robot-details/robot-details.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateRobotComponent,
  },
  {
    path: ':id',
    component: RobotDetailsComponent,
  },
  {
    path: 'control/:id',
    component: ControlComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotRoutingModule {}
