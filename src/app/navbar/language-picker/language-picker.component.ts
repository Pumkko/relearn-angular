import { Component } from '@angular/core';
import { NavbarLanguageFrenchComponent } from './french/navbar-language-french.component';
import { NavbarLanguageUsEnglish } from './us-english/navbar-language-us-english.component';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [NavbarLanguageFrenchComponent, NavbarLanguageUsEnglish],
  templateUrl: './language-picker.component.html',
})
export class LanguagePickerComponent {

}
