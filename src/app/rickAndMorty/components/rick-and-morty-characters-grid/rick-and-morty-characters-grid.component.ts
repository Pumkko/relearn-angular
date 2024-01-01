import { ChangeDetectionStrategy, Component, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community'; // Column Definitions Interface
import { RickAndMortyCharacter } from '../../services/rick-and-morty-character';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rick-and-morty-characters-grid',
  standalone: true,
  imports: [AgGridModule, TranslateModule],
  templateUrl: './rick-and-morty-characters-grid.component.html',
  providers: [RickAndMortyService],
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
    });
  }

  defaultColDef: ColDef = {
    flex: 1
  }

  colDefs: ColDef<RickAndMortyCharacter>[] = [
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
      headerValueGetter: () => this._translateService.instant('rickAndMorty.gridHeaders.lifeStatus')
    },
    {
      colId: "validSince",
      field: "validSince",
      headerValueGetter: () => this._translateService.instant('rickAndMorty.gridHeaders.validSince')
    }
  ]

  get rickAndMortyCharactersQuery() {
    return this._rickAndMortyService.query;
  }


  onGridReady(event: GridReadyEvent<RickAndMortyCharacter>) {
    this.api = event.api;
  }

}
