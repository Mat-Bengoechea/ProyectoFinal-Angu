import { NgModule, isDevMode } from '@angular/core';
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
import { UsersModule } from './feature/dashboard/users/users.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './core/services/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/services/store/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent, HomeComponent,
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
    UsersModule,
    StoreModule.forRoot(rootReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }), 
    EffectsModule.forRoot([AuthEffects]),   
],

  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent] ,
})
export class AppModule {}
