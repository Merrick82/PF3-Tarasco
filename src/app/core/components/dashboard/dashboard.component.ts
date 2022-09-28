import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  public operator!: User;
  public showInit!: boolean;

  constructor(private observer: BreakpointObserver, private router: Router, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getSession().subscribe((response) => {
      this.operator = response.user!;
    });

    this.authService.getInitState().subscribe((response) => {
      this.showInit = response.active;
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  private hideInit() {
    this.authService.changeInitState(false);
  }

  public navigateTo(path: string) {
    this.hideInit();
    this.router.navigate([`/dashboard/${path}`]);
  }

  public logout() {
    this.authService.logout();
  }
}
