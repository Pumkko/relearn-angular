import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddNewCharacterSchema } from '../../../model/rick-and-morty-add-character';
import { LifeStatus } from '../../../model/rick-and-morty-character';
import { RickAndMortyService } from '../../../services/rick-and-morty.service';
import { DisplayAddCharacterModalService } from '../../../services/display-add-character-modal.service';

@Component({
  selector: 'app-add-character-modal',
  templateUrl: './add-character-modal.component.html',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCharacterModalComponent {

  private readonly fb = inject(FormBuilder)
  private readonly _rickAndMortyService = inject(RickAndMortyService);
  private readonly _displayModalService = inject(DisplayAddCharacterModalService);


  isSaving = signal(false);

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

    this._rickAndMortyService.addNewCharacterMutation().mutateAsync(result.data).finally(() => {
      this._displayModalService.onHideModal();
    })
  }

  cancel() {
    this._displayModalService.onHideModal();
  }
}
