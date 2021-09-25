import { Component, OnInit } from '@angular/core';
import { NavOption } from '../../models/nav-option.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  navOptions: NavOption[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
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
