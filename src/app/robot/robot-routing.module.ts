import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRobotComponent } from './components/create-robot/create-robot.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateRobotComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotRoutingModule {}
