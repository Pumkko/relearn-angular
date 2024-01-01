import { ChangeDetectionStrategy, Component, Inject, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './navbar/navbar.component';
import { ParentComponent } from './playWithOnPush/parent/parent.component';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Subject, filter, takeUntil } from 'rxjs';
import { EventMessage, InteractionStatus, RedirectRequest, PopupRequest, AuthenticationResult, EventType } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ParentComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'relearn-angular';

  ngOnInit() {
    initFlowbite();
  }

}
