import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormuserComponent } from './components/formuser/formuser.component';
import { TablauserComponent } from './components/tablauser/tablauser.component';
import { SharedModule } from '../../../shared/shared.module';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogDeleteusersComponent } from '../../../shared/components/dialogo/usersdialogDelete.component';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';



@NgModule({
  declarations: [
    FormuserComponent,
    TablauserComponent,
    UsersComponent,
    DialogDeleteusersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usersFeature),
    EffectsModule.forFeature([UserEffects])
    
  ],
  exports: [
   UsersComponent,
  ],
})
export class UsersModule { }
