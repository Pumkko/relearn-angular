import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { AddNewCharacterSchema } from '../../services/rick-and-morty-add-character';
import { number } from 'zod';
import { LifeStatus } from '../../services/rick-and-morty-character';

@Component({
  selector: 'app-add-new-character-button',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './add-new-character-button.component.html',
})
export class AddNewCharacterButtonComponent {

  private fb = inject(FormBuilder)
  private _rickAndMortyService = inject(RickAndMortyService);

  addNewCharacterForm = this.fb.group({
    name: ['', Validators.required],
    origin: ['', Validators.required],
    species: ['', Validators.required],
    lifeStatus: [LifeStatus.Unknown, Validators.required]
  });

  onSubmit() {
    const result = AddNewCharacterSchema.safeParse(this.addNewCharacterForm.value);
    if (result.success === false) {
      console.error(result.error);
      console.error("Valid form but invalid schema, something's very wrong");
      return;
    }

    this._rickAndMortyService.addNewCharacterMutation().mutate(result.data)
  }
}
