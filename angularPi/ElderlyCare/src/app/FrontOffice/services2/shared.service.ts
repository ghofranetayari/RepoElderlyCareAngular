// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private onSubmitSource = new Subject<void>();

  onSubmit$ = this.onSubmitSource.asObservable();

  triggerOnSubmit(): void {
    console.log('shared');
    this.onSubmitSource.next();
  }
}
