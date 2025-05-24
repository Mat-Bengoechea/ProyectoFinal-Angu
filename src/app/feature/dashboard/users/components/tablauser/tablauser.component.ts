import { Component, OnInit } from '@angular/core';
import { Users } from '../../interface/interface';
import { userService } from '../../../../../core/services/UserService.service';
import { MatDialog } from '@angular/material/dialog';
import { FormuserComponent } from '../formuser/formuser.component';
import { filter, Observable } from 'rxjs';
import { RootState } from '../../../../../core/services/store';
import { Store } from '@ngrx/store';
import {
  selectUsers,
  selectUserserror,
  selectusersLoading,
  selectUserToEdit,
} from '../../store/user.selects';
import { UserActions } from '../../store/user.actions';
import { DialogDeleteusersComponent } from '../../../../../shared/components/dialogo/usersdialogDelete.component';

@Component({
  selector: 'tablauser',
  standalone: false,
  templateUrl: './tablauser.component.html',
  styleUrl: './tablauser.component.scss',
})
export class TablauserComponent implements OnInit {
  displayedColumns: string[] = ['fullname', 'email', 'role', 'actions'];
  TableUser: Users[] = [];
  dataSource: Users[] = [];

  users$: Observable<Users[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private userlistservice: userService,
    private dialog: MatDialog,
    private store: Store<RootState>
  ) {
    this.users$ = this.store.select(selectUsers);
    this.isLoading$ = this.store.select(selectusersLoading);
    this.error$ = this.store.select(selectUserserror);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.store.select(selectUsers).subscribe({
      next: (users) => {
        console.log('Users from store', users);
        this.TableUser = users;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      },
    });
  }

  userEdit(id: string) {
    this.store.dispatch(UserActions.setUserToEdit({ id }));
    const sub = this.store
      .select(selectUserToEdit)
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        const dialogRef = this.dialog.open(FormuserComponent, {
          width: '500px',
          height: 'auto',
          disableClose: false,
        });

        dialogRef
          .afterClosed()
          .subscribe(() => this.store.dispatch(UserActions.clearUserToEdit()));
      });
  }

  deleteUser(id: string) {
    this.dialog
      .open(DialogDeleteusersComponent)
      .afterClosed()
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            this.store.dispatch(UserActions.deleteUser({ id }));
          }
        },
      });
  }
}
