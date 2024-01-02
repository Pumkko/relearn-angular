import { Injectable, inject, signal } from '@angular/core';
import { Modal, ModalInterface } from 'flowbite';
import { RickAndMortyCharacter } from '../../../zod-schema/rick-and-morty-character';

@Injectable({
  providedIn: 'root'
})
export class DisplayUpdateCharacterModalService {

  modal: ModalInterface | null = null;

  currentlySelectedCharacter = signal<RickAndMortyCharacter | null>(null);
  onShowModal(character: RickAndMortyCharacter | null | undefined) {
    const $modalElement: HTMLElement | null = document.querySelector('#update-character-modal');
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
