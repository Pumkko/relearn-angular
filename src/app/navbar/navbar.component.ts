import { Component } from '@angular/core';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LanguagePickerComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

}
