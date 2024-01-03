import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarLanguageFrenchComponent } from './french/navbar-language-french.component';
import { NavbarLanguageUsEnglish } from './us-english/navbar-language-us-english.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [NavbarLanguageFrenchComponent, NavbarLanguageUsEnglish, TranslateModule],
  templateUrl: './language-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagePickerComponent {
  translateService = inject(TranslateService);


  translateTo(language: 'en' | 'fr') {
    this.translateService.use(language);
  }


  get currentLanguage(): string {
    return this.translateService.currentLang ?? this.translateService.defaultLang;
  }


}
