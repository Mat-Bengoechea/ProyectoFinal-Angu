import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './student/interface/interface';
import { LoginComponent } from '../auth/login/login.component';
import { Observable } from 'rxjs';

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

  // constructor(private router: Router, private AuthService: AuthService) { }

  // login() {
  //   this.AuthService.logout();
  //   this.router.navigate(['/auth']);
  // }
  openDialog(arg0: string,arg1: string) {
    throw new Error('Method not implemented.');
    }

    constructor(private dialog: MatDialog) { 
    }


    openFormDialog(student?: Student): void {
        this.dialog.open(LoginComponent, {
          width: '500px',
          height: '500px',
          disableClose: false,
          data: student ? student : null,
        });
      }
}
