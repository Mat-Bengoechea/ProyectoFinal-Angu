import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer() {

      if(this.drawer){
        this.drawer.toggle();
      }
  }

  constructor(private router: Router, private AuthService: AuthService) { }

  login() {
    this.AuthService.logout();
    this.router.navigate(['/auth']);
  }
}
