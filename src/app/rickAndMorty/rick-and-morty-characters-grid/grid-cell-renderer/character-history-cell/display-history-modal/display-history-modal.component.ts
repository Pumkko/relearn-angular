
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

@Component({
  selector: 'app-display-history-modal',
  standalone: true,
  imports: [AgGridModule, TranslateModule],
  templateUrl: './display-history-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayHistoryModalComponent {

  historyModalService = inject(DisplayHistoryModalService);
  translateService = inject(TranslateService);
  
  characterId = computed(() => this.historyModalService.currentlySelectedCharacter()?.id ?? "");
  
  http = inject(HttpClient);
  historyQuery = injectQuery(() => ({
    queryKey: ['rickAndMortyCharacterHistory', this.characterId()],
    queryFn: () => this.fetchCharacterHistory(this.characterId()),
    enabled: this.historyModalService.currentlySelectedCharacter() !== null,
    retry(failureCount, error) {
      console.error(error);
      if (error instanceof ZodError) {
        return false;
      }

      return failureCount < 2;
    },
  }));

  private fetchCharacterHistory(characterId: string) {
    const charactersEndpoint = new URL(`/Character/${characterId}/history`, environment.apiConfig.uri);
    return lastValueFrom(
      this.http.get<unknown>(charactersEndpoint.toString())
        .pipe(map(result => {
          const parsed = RickAndMortyCharacterHistoryResponseSchema.safeParse(result);
          if (!parsed.success) {
            throw parsed.error;
          }

          return parsed.data;
        }))
    )
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
