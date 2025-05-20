import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './student/interface/interface';
import { FormuserComponent } from './users/components/formuser/formuser.component';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
  openDialog(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private dialog: MatDialog) {}

  openFormDialog(student?: Student): void {
    this.dialog.open(FormuserComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
      data: student ? student : null,
    });
  }
}
