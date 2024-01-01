import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-new-character-button',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './add-new-character-button.component.html',
})
export class AddNewCharacterButtonComponent {

  private fb = inject(FormBuilder)

  addNewCharacterForm = this.fb.group({
    name: ['', Validators.required],
    origin: ['', Validators.required],
    species: ['', Validators.required],
    lifeStatus: [0, Validators.required]
  });
}
