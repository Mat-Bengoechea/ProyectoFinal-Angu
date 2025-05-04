import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentModule } from './feature/dashboard/student/student.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CoursesModule } from "./feature/dashboard/courses/courses.module";
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { AuthModule } from './feature/auth/auth.module';
import { HomeComponent } from './feature/dashboard/home/home.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
      ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StudentModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    CoursesModule,
    DashboardModule,
    AuthModule,
],

  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent] ,
})
export class AppModule {}
