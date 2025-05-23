import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ElementComponent } from './components/element/element.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HideEmailPipe } from './pipes/hide-email.pipe';
import { DirectiveDirective } from './directives/directive.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { UserNamePipe } from './pipes/UserName.pipe';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from './components/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogComponent } from './components/dialogo/dialogo.component';

@NgModule({
  declarations: [SidebarComponent, ToolbarComponent, ElementComponent, FullNamePipe, HideEmailPipe, DirectiveDirective, FooterComponent,DialogComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    UserNamePipe,
    MatProgressSpinnerModule
  ],

  exports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    FullNamePipe,
    HideEmailPipe,
    DirectiveDirective,
    MatDialogModule,
    UserNamePipe,
    MatCardModule,
    RouterModule,
    SidebarComponent,
    MatFormFieldModule,
    FooterComponent,
    MatProgressSpinnerModule,
    DialogComponent
  ],

})
export class SharedModule {}
