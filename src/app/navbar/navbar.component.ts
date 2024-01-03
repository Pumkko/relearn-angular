import { ChangeDetectionStrategy, Component, importProvidersFrom, inject } from '@angular/core';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TranslateModule,
    LanguagePickerComponent,
    LoginComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {


}
