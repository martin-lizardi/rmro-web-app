import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlertConfiguration {
  type: 'alert' | 'warning' | 'danger';
  title: string;
  content?: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertConfiguration) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
