import { Component, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DisplayHistoryModalService } from '../../../../services/display-history-modal.service';

@Component({
  selector: 'app-character-history-cell',
  standalone: true,
  imports: [],
  templateUrl: './character-history-cell.component.html'
})
export class CharacterHistoryCellComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;

  private readonly _modalService = inject(DisplayHistoryModalService);

  agInit(params: ICellRendererParams) {
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    this.params = params;
    // As we have updated the params we return true to let AG Grid know we have handled the refresh.
    // So AG Grid will not recreate the cell renderer from scratch.
    return true;
  }

  onShowModal() {
    this._modalService.onShowModal(this.params.data);
  }
}
