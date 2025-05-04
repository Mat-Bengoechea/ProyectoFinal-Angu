import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./feature/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
      canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
