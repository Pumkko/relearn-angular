import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LifeStatus } from '../../services/rick-and-morty-character';
import { UpdateCharacterSchema } from '../../services/rick-and-morty-update-character';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-rick-and-morty-character-modal',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './update-rick-and-morty-character-modal.component.html',
})
export class UpdateRickAndMortyCharacterModalComponent {

  private fb = inject(FormBuilder)
  private _rickAndMortyService = inject(RickAndMortyService);


  updateCharacterForm = this.fb.group({
    lifeStatus: [LifeStatus.Unknown, Validators.required]
  });

  onSubmit() {
    const result = UpdateCharacterSchema.safeParse(this.updateCharacterForm.value);
    if (result.success === false) {
      console.error(result.error);
      console.error("Valid form but invalid schema, something's very wrong");
      return;
    }

    this._rickAndMortyService.updateCharacterMutation().mutate(result.data)
  }
}
