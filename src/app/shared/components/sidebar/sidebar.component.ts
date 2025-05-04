import { Component } from '@angular/core';
import { userService } from '../../../core/services/UserService.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
userName$: Observable<string>;

authUser: Observable<any>;

constructor(private userService: userService, private authService: AuthService, private router: Router) { 
  this.userName$ = this.userService.userName$;
  this.authUser = this.authService.authUser$;
}

}
