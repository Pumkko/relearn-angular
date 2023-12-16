import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CounterService } from '../counter.service';


export type Counter = {
  count: number;
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  counterService = inject(CounterService);


  @Input({required: true})
  counter: Counter = {
    count: 0
  }

  get count(): number {
    return this.counterService.count();
  }

  get countWithoutSignal(): number {
    return this.counterService.withoutSignal;
  }
}
