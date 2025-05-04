import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
authUser: Observable<any>;

  constructor(private authService: AuthService, private router: Router) {
    this.authUser = this.authService.authUser$;

  }

}
