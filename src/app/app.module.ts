import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentModule } from './feature/student/student.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StudentModule,
    SharedModule,
    AppComponent,
    MatSidenavModule,
    BrowserAnimationsModule,
  ],
  exports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StudentModule,
    SharedModule,
    AppComponent,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [],
})
export class AppModule {

}
