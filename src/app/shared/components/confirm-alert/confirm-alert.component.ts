import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlertConfiguration {
  type: 'info' | 'warning' | 'danger';
  title: string;
  content?: string;
}

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.scss'],
})
export class ConfirmAlertComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertConfiguration) {}

  ngOnInit(): void {}
}
