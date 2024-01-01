import { ChangeDetectionStrategy, Component, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community'; // Column Definitions Interface
import { RickAndMortyCharacter } from '../../services/rick-and-morty-character';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AddNewCharacterButtonComponent } from '../add-new-character-button/add-new-character-button.component';
import { CharacterHistoryCellComponent } from './grid-cell-renderer/character-history-cell/character-history-cell.component';
import { UpdateCharacterCellComponent } from './grid-cell-renderer/update-character-cell/update-character-cell.component';

@Component({
  selector: 'app-rick-and-morty-characters-grid',
  standalone: true,
  imports: [AgGridModule, TranslateModule, AddNewCharacterButtonComponent],
  templateUrl: './rick-and-morty-characters-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RickAndMortyCharactersGridComponent {

  private api: GridApi<RickAndMortyCharacter> | null = null;
  private readonly _rickAndMortyService: RickAndMortyService;
  private readonly _translateService: TranslateService;

  constructor() {
    this._rickAndMortyService = inject(RickAndMortyService);
    this._translateService = inject(TranslateService);
    this._translateService.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.api?.refreshHeader();
      this.api?.redrawRows();
    });
  }

  defaultColDef: ColDef = {
    flex: 1
  }

  colDefs: ColDef<RickAndMortyCharacter>[] = [
    {
      colId: 'history',
      cellRenderer: CharacterHistoryCellComponent,
      flex: 0.3
    },
    {
      colId: 'update',
      cellRenderer: UpdateCharacterCellComponent,
      flex: 0.3
    },
    {
      colId: "name",
      field: "name",
      headerValueGetter: () => this._translateService.instant('rickAndMorty.gridHeaders.name')
    },
    {
      colId: "species",
      field: "species",
      headerValueGetter: () => this._translateService.instant('rickAndMorty.gridHeaders.species')
    },
    {
      colId: "origin",
      field: "origin",
      headerValueGetter: () => this._translateService.instant('rickAndMorty.gridHeaders.origin')
    },
    {
      colId: "lifeStatus",
      field: "lifeStatus",
      headerValueGetter: () => this._translateService.instant('rickAndMorty.gridHeaders.lifeStatus'),
      valueGetter: (params) => {
        if (!params.data) {
          return null;
        }
        return this._translateService.instant(`rickAndMorty.gridHeaders.lifestatusValue.${params.data?.lifeStatus}`)
      }
    },
    {
      colId: "validSince",
      field: "validSince",
      headerValueGetter: () => this._translateService.instant('rickAndMorty.gridHeaders.validSince'),
      valueGetter: (params) => {
        if(!params.data){
          return null;
        }

        const date = new Date(params.data.validSince);
        const formatted = new Intl.DateTimeFormat(this._translateService.currentLang).format(date)
        return formatted;
      }
    }
  ]

  get rickAndMortyCharactersQuery() {
    return this._rickAndMortyService.query;
  }


  onGridReady(event: GridReadyEvent<RickAndMortyCharacter>) {
    this.api = event.api;
  }

}
