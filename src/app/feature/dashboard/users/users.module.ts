import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormuserComponent } from './components/formuser/formuser.component';
import { TablauserComponent } from './components/tablauser/tablauser.component';
import { SharedModule } from '../../../shared/shared.module';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormuserComponent,
    TablauserComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
   UsersComponent,
  ],
})
export class UsersModule { }
