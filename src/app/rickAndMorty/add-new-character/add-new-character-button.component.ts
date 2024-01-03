import { Component, inject } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { DisplayAddCharacterModalService } from './display-add-character-modal.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-character-button',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './add-new-character-button.component.html',
})
export class AddNewCharacterButtonComponent {


  private readonly modalService = inject(DisplayAddCharacterModalService);

  onShowModal() {
    this.modalService.onShowModal();
  }
}
