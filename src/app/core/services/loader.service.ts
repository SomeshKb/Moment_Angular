import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
    this.status.next(true);
  }
  isShown() {
    return this.status.value;
  }
  hide() {
    this.status.next(false);
  }
}
