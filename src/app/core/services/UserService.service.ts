import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class UserService {
    private userNameSubject = new BehaviorSubject<string>("Jose Luis");
    userName$: Observable<string> = this.userNameSubject.asObservable();

    setUserName(name: string): void {
        this.userNameSubject.next(name);
    }
}