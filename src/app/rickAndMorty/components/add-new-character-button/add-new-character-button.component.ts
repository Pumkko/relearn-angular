import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { AddNewCharacterSchema } from '../../model/rick-and-morty-add-character';
import { number } from 'zod';
import { LifeStatus } from '../../model/rick-and-morty-character';
import { DisplayAddCharacterModalService } from '../../services/display-add-character-modal.service';

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
