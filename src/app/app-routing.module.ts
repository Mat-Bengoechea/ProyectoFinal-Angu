import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from '../app/feature/dashboard/student/student.component';
import { CoursesComponent } from '../app/feature/dashboard/courses/courses.component';
import { HomeComponent } from './feature/dashboard/home/home.component';
import { DetailsComponent } from './feature/dashboard/courses/pages/details/details.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { LoginComponent } from './feature/auth/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentComponent,
      },

      {
        path: 'courses',
        component: CoursesComponent,
      },

      {
        path: 'courses/:title',
        component: DetailsComponent,
      },

      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
