import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  withoutSignal = 0;
  count = signal(0);

  increment() {
    // comment this value and set child component to OnPush to understand when it fails
    //this.count.update((v) => v + 1);
    this.withoutSignal++;
  }


  constructor() { }


}
