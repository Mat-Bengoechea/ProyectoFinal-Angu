import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../app/feature/student/components/form/form.component';
import { userService } from './core/services/UserService.service';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer() {
    this.drawer.toggle();
  }

  openDialog(arg0: string,arg1: string) {
throw new Error('Method not implemented.');
}

  title = 'ProjectoFinal';

  showFiller = false;

  constructor(public userService: userService, private dialog: MatDialog) { }

  openFormDialog(): void {
    this.dialog.open(FormComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
    });
  }
  
  
}
