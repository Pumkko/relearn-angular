import { Component, inject } from '@angular/core';
import { ChildComponent, Counter } from '../child/child.component';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
})
export class ParentComponent {
  counterService = inject(CounterService);

  counter: Counter = {
    count: 0
  }

  onClick() {
    this.counter.count++;
    //this.counterService.increment();
  }

}
