import { Component, OnInit } from '@angular/core';
import { NavOption } from '../../models/nav-option.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  navOptions: NavOption[];

  constructor() {
    this.navOptions = [
      {
        path: '',
        title: 'Inicio',
      },
    ];
  }

  ngOnInit(): void {}

  selectionChange(ev: Event) {
    console.log(ev.target);
  }
}
