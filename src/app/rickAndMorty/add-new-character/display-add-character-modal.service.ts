import { Injectable, signal } from '@angular/core';
import { ModalInterface, Modal } from 'flowbite';

@Injectable({
  providedIn: 'root'
})
export class DisplayAddCharacterModalService {

  modal: ModalInterface | null = null;
  onShowModal() {
    const $modalElement: HTMLElement | null = document.querySelector('#add-character-modal');
    this.modal = new Modal($modalElement, {}, {});
    this.modal.show();
  }

  onHideModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }
}
