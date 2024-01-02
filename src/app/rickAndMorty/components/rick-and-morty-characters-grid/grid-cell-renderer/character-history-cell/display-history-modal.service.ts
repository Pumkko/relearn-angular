import { Injectable, signal } from '@angular/core';
import { ModalInterface, Modal } from 'flowbite';
import { RickAndMortyCharacter } from '../../../../model/rick-and-morty-character';

@Injectable({
  providedIn: 'root'
})
export class DisplayHistoryModalService {

  modal: ModalInterface | null = null;

  currentlySelectedCharacter = signal<RickAndMortyCharacter | null>(null);
  onShowModal(character: RickAndMortyCharacter | null | undefined) {
    const $modalElement: HTMLElement | null = document.querySelector('#character-history-modal');
    this.modal = new Modal($modalElement, {}, {});
    if (!character) {
      console.error("onShowUpdateModal but data is undefined");
      return;
    }

    this.currentlySelectedCharacter.set(character);
    this.modal.show();
  }

  onHideModal() {
    this.currentlySelectedCharacter.set(null);
    if (this.modal) {
      this.modal.hide();
    }
  }
}
