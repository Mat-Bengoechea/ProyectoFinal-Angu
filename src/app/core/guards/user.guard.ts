import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getRole().pipe(
    map((user) => {
       console.log('Usuario en userGuard:', user);
      if (!user) {
        router.navigate(['/auth']);
        return false;
      }

      if (user.role !== 'user') {
        router.navigate(['/dashboard']);
        return false;
      }
      return true;
    })
  );
};