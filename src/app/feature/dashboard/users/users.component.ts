import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormuserComponent } from './components/formuser/formuser.component';
import { Users } from './interface/interface';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  openDialog(arg0: string,arg1: string) {
    throw new Error('Method not implemented.');
    }
  constructor(private dialog: MatDialog) { }

  openFormDialog(user?: Users): void {
    this.dialog.open(FormuserComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
      data: user ? user : null,
    });
  }

}
