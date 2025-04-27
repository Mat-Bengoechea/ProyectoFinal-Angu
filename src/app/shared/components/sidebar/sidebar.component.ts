import { Component } from '@angular/core';
import { userService } from '../../../core/services/UserService.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
userName$: Observable<string>;

constructor(private userService: userService) { 
  this.userName$ = this.userService.userName$;
}

}
