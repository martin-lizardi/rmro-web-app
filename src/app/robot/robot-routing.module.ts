import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotRoutingModule {}
