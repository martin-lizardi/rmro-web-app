import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import {
  StorageService,
  UserData,
} from '../core/services/storage/storage.service';
import { UserService } from '../core/services/user/user.service';

interface NavOption {
  path: string;
  title: string;
}

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
  userData$!: Observable<UserData>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.navOptions = [
      {
        path: '',
        title: 'Inicio',
      },
      {
        path: 'robot/create',
        title: 'Agregar robot',
      },
    ];
    this.subscribeToUser();
  }

  ngOnInit(): void {}

  private subscribeToUser() {
    const uid = this.storageService.user?.uid || '';
    this.userData$ = this.userService.getUser(uid);
  }

  selectionChange(ev: Event) {
    console.log(ev.target);
  }

  async logout() {
    this.storageService.clearUser();
    try {
      await this.authService.logout();
    } catch (error) {
    } finally {
      this.router.navigate(['/login']);
    }
  }
}
