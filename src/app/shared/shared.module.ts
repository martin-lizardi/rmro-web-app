import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmAlertComponent } from './components/confirm-alert/confirm-alert.component';

@NgModule({
  declarations: [AlertComponent, ConfirmAlertComponent],
  exports: [AlertComponent, ConfirmAlertComponent],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
