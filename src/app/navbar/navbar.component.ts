import { Component } from '@angular/core';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LanguagePickerComponent,
    LoginComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

}
