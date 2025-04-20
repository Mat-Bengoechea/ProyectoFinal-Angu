import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";


@Pipe({
    name: "userName",
    standalone: true
})

export class UserNamePipe implements PipeTransform {
 transform(userName$: Observable<string>): string | null {
    let userName: string | null = null;
    userName$.subscribe((name) => {
        userName = name;
    });
    return userName;
 }
}