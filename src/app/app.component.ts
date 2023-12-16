import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './navbar/navbar.component';
import { ChildComponent, Counter } from './playWithOnPush/child/child.component';
import { CounterService } from './playWithOnPush/counter.service';
import { ParentComponent } from './playWithOnPush/parent/parent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ParentComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'relearn-angular';


  ngOnInit() {
    initFlowbite()
  }

}
