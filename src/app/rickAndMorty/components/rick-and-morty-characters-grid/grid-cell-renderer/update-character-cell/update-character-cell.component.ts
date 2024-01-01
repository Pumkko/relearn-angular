import { Component, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RickAndMortyCharacter } from '../../../../services/rick-and-morty-character';
import { Modal } from 'flowbite';
import type { ModalInterface } from 'flowbite';

@Component({
  selector: 'app-update-character-cell',
  standalone: true,
  imports: [],
  templateUrl: './update-character-cell.component.html',
})
export class UpdateCharacterCellComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams<RickAndMortyCharacter>;

  agInit(params: ICellRendererParams<RickAndMortyCharacter>) {
    this.params = params;
  }

  refresh(params: ICellRendererParams<RickAndMortyCharacter>) {
    this.params = params;
    // As we have updated the params we return true to let AG Grid know we have handled the refresh.
    // So AG Grid will not recreate the cell renderer from scratch.
    return true;
  }

  $modalElement: HTMLElement | null = document.querySelector('#update-character-modal');
  onShowModal() {
    const modal: ModalInterface = new Modal(this.$modalElement, {}, {});
    modal.show();
  }


}
