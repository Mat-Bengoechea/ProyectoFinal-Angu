import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideEmail',
  standalone: false
})
export class HideEmailPipe implements PipeTransform {
  transform(email: string, hide: boolean = true): string {
    if (!email || !hide) return email; 
    const [localPart, domain] = email.split('@');
    const hiddenLocalPart = localPart.slice(0, 2) + '***'; 
    return `${hiddenLocalPart}@${domain}`;
  }
}
