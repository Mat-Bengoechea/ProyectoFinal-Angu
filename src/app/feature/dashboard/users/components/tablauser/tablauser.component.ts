import { Component, OnInit } from '@angular/core';
import {Users} from '../../interface/interface';
import { userService } from '../../../../../core/services/UserService.service';
import { MatDialog } from '@angular/material/dialog';
import { FormuserComponent } from '../formuser/formuser.component';


@Component({
  selector: 'tablauser',
  standalone: false,
  templateUrl: './tablauser.component.html',
  styleUrl: './tablauser.component.scss'
})
export class TablauserComponent implements OnInit {
  displayedColumns: string[] = ['fullname', 'email', 'role', 'actions'];
  TableUser: Users[] = [];

  constructor(private userlistservice: userService,
    private dialog: MatDialog) {
  } 

  ngOnInit(): void {
    this.userlistservice.UserList$.subscribe((data)=> {
      this.TableUser = data;
    })
    this.userlistservice.getuserListobs();
  }

  userEdit(id: string) {
    this.userlistservice.setUpdateUser(id);
    this.dialog.open(FormuserComponent,{
      width: '500px',
      height: 'auto',
      disableClose: false,
    });
  }

  deleteUser(id: string) {
    this.userlistservice.deleteUser(id);
  }
}
