import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarnombre, validarpassword, validateEmail } from '../../../../../shared/utils/validator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { userService } from '../../../../../core/services/UserService.service';
import { v4 as uuid } from 'uuid';
import { Users } from '../../interface/interface';
import { RootState } from '../../../../../core/services/store';
import { Store } from '@ngrx/store';
import { selectUserToEdit } from '../../store/user.selects';
import { DialogComponent } from '../../../../../shared/components/dialogo/dialogo.component';
import { UserActions } from '../../store/user.actions';

@Component({
  selector: 'app-formuser',
  standalone: false,
  templateUrl: './formuser.component.html',
  styleUrl: './formuser.component.scss',
})
export class FormuserComponent {
  formuser: FormGroup;
  isEdit: boolean = false;
  constructor(
    private matDialog: MatDialog,
    private userService: userService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormuserComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: Users,
    private store: Store<RootState>,
  ) {
    this.formuser = this.fb.group({
      id: [''],
      fullname: ['', [Validators.required, Validators.minLength(3), validarnombre]],
      email: ['', [Validators.required, Validators.email, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(6),validarpassword]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void{
    this.store.select(selectUserToEdit).subscribe((user)=>{
      if(user){
        this.formuser.patchValue(user);
        this.isEdit = true;
      }else{
        this.formuser.reset();
      }
    })
  }

  submitFormuser() {
    if (!this.isEdit){
      this.formuser.patchValue({
        id: uuid(),
      })
    }
    this.matDialog
    .open(DialogComponent)
    .afterClosed()
    .subscribe({
      next: (confirmed: boolean)=>{
        if (confirmed){
          console.log(this.formuser.value);
          if(this.isEdit){
            this.store.dispatch(UserActions.updateUser({user: this.formuser.value}));
          }else{
            this.store.dispatch(UserActions.addUser({user: this.formuser.value}));
          }
          this.formuser.reset({});
          this.isEdit = false;
          this.dialogRef.close(true);
        }
      },
      error: (error)=>{
        console.error('Error:',error);
      },
    })
  }
}
