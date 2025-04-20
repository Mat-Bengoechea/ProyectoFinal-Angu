import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class userService {
    private userNameSubject = new BehaviorSubject<string>("Jose Luis");
    userName$ = this.userNameSubject.asObservable();
}