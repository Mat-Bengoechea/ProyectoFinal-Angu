import { Component } from '@angular/core';
import { userService } from '../../../core/services/UserService.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/services/store';

@Component({
  selector: 'sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userName$: Observable<string>;

  authUser: Observable<any>;
  authUser$: Observable<any>;

  constructor(
    private userService: userService,
    private authService: AuthService,
    private router: Router,
    private store: Store<RootState>
  ) {
    this.userName$ = this.userService.userName$;
    this.authUser = this.authService.authUser$;
    this.authUser$ = this.store.select((state) => state.auth.authUser);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
