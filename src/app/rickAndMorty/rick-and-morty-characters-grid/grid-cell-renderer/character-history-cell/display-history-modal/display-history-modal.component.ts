
import { lastValueFrom, map } from 'rxjs';
import { ZodError } from 'zod';
import { HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { DisplayHistoryModalService } from '../display-history-modal.service';
import { environment } from '../../../../../../environments/environment';
import { RickAndMortyCharacterHistoryResponseSchema, LifeStatusHistory } from '../../../../zod-schema/rick-and-morty-character-history';
import { CharacterHistoryService } from '../character-history-service';

@Component({
  selector: 'app-display-history-modal',
  standalone: true,
  imports: [AgGridModule, TranslateModule],
  templateUrl: './display-history-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayHistoryModalComponent {

  historyModalService = inject(DisplayHistoryModalService);
  characterHistoryService = inject(CharacterHistoryService);
  translateService = inject(TranslateService);


  get historyQuery() {
    return this.characterHistoryService.historyQuery;
  }

  defaultColDef: ColDef = {
    flex: 1
  }

  colDefs: ColDef<LifeStatusHistory>[] = [
    {
      colId: "name",
      field: "lifeStatus",
      valueGetter: (params) => {
        if (!params.data) {
          return null;
        }
        return this.translateService.instant(`rickAndMorty.gridHeaders.lifestatusValue.${params.data?.lifeStatus}`)
      }
    }, {
      colId: "validSince",
      field: "validFrom",
      sort: 'desc',
      valueGetter: (params) => {
        if (!params.data) {
          return null;
        }

        const date = new Date(params.data.validFrom);
        const formatted = new Intl.DateTimeFormat(this.translateService.currentLang, {
          dateStyle: 'medium',
          timeStyle: 'medium'
        }).format(date)
        return formatted;
      }
    },
    {
      colId: "validSince",
      field: "validTo",
      valueGetter: (params) => {
        if (!params.data) {
          return null;
        }

        const date = new Date(params.data.validTo);
        const formatted = new Intl.DateTimeFormat(this.translateService.currentLang, {
          dateStyle: 'medium',
          timeStyle: 'medium'
        }).format(date)
        return formatted;
      }
    }
  ]

  close() {
    this.historyModalService.onHideModal();
  }

}
