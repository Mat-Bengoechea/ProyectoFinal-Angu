import { Component,} from '@angular/core';
import { Store } from '@ngrx/store';
import { setAuthUser } from './core/services/store/auth/auth.actions';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store){
    const userStr = localStorage.getItem('user');
    if(userStr){
      const user = JSON.parse(userStr);
      this.store.dispatch(setAuthUser({payload: user}))
    }
  }
}
