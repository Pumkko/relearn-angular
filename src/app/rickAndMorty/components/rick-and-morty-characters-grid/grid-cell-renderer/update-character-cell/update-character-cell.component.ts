import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { LifeStatus, RickAndMortyCharacter } from '../../../../services/rick-and-morty-character';
import { RickAndMortyService } from '../../../../services/rick-and-morty.service';
import { UpdateCharacterSchema } from '../../../../services/rick-and-morty-update-character';

@Component({
  selector: 'app-update-character-cell',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './update-character-cell.component.html',
})
export class UpdateCharacterCellComponent implements ICellRendererAngularComp  {
  params!: ICellRendererParams<RickAndMortyCharacter>;

  private fb = inject(FormBuilder)
  private _rickAndMortyService = inject(RickAndMortyService);

  agInit(params: ICellRendererParams<RickAndMortyCharacter>) {
      this.params = params;
  }

  refresh(params: ICellRendererParams<RickAndMortyCharacter>) {
      this.params = params;
      // As we have updated the params we return true to let AG Grid know we have handled the refresh.
      // So AG Grid will not recreate the cell renderer from scratch.
      return true;
  }

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
