import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StudentComponent } from './student/student.component';
import { CoursesComponent } from './courses/courses.component';
import { DetailsComponent } from './courses/pages/details/details.component';
import { HomeComponent } from './home/home.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentComponent,
        canActivate: [adminGuard],
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
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
