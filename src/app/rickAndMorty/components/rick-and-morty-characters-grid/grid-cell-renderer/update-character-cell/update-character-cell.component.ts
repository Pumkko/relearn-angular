import { Component, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RickAndMortyCharacter } from '../../../../model/rick-and-morty-character';
import { DisplayUpdateCharacterModalService } from './display-update-character-modal.service';

@Component({
  selector: 'app-update-character-cell',
  standalone: true,
  imports: [],
  templateUrl: './update-character-cell.component.html',
})
export class UpdateCharacterCellComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams<RickAndMortyCharacter>;

  private _modalService = inject(DisplayUpdateCharacterModalService);
  agInit(params: ICellRendererParams<RickAndMortyCharacter>) {
    this.params = params;
  }
  refresh(params: ICellRendererParams<RickAndMortyCharacter>) {
    this.params = params;
    // As we have updated the params we return true to let AG Grid know we have handled the refresh.
    // So AG Grid will not recreate the cell renderer from scratch.
    return true;
  }

  onShowModal() {
    this._modalService.onShowModal(this.params.data);
  }
}
