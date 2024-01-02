import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LifeStatus } from '../../../../../model/rick-and-morty-character';
import { UpdateCharacterSchema } from '../../../../../model/rick-and-morty-update-character';
import { RickAndMortyService } from '../../../../../services/rick-and-morty.service';
import { DisplayUpdateCharacterModalService } from '../display-update-character-modal.service';


@Component({
  selector: 'app-update-rick-and-morty-character-modal',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './update-rick-and-morty-character-modal.component.html',
})
export class UpdateRickAndMortyCharacterModalComponent {

  private fb = inject(FormBuilder)
  private _rickAndMortyService = inject(RickAndMortyService);
  private _updateCharacterModalService = inject(DisplayUpdateCharacterModalService);


  character = computed(() => this._updateCharacterModalService.currentlySelectedCharacter());

  updateCharacterForm = computed(() => this.fb.group({
    characterId: [this.character()?.id],
    newLifeStatus: [this.character()?.lifeStatus ?? LifeStatus.Unknown, Validators.required]
  }));


  cancel() {
    this._updateCharacterModalService.onHideModal();
  }

  onSubmit() {
    const result = UpdateCharacterSchema.safeParse(this.updateCharacterForm().value);
    if (result.success === false) {
      console.error(result.error);
      console.error("Valid form but invalid schema, something's very wrong");
      return;
    }

    this._rickAndMortyService.updateCharacterMutation().mutate(result.data);
    this._updateCharacterModalService.onHideModal();
  }
}
