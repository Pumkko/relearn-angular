import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; // Column Definitions Interface
import { RickAndMortyCharacter } from '../../services/rick-and-morty-character';

@Component({
  selector: 'app-rick-and-morty-characters-grid',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './rick-and-morty-characters-grid.component.html',
  providers: [RickAndMortyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RickAndMortyCharactersGridComponent {

  private readonly _rickAndMortyService = inject(RickAndMortyService);


  colDefs: ColDef<RickAndMortyCharacter>[] = [
    {
      colId: "name",
      field: "name"
    },
    {
      colId: "species",
      field: "species"
    },
    {
      colId: "origin",
      field: "origin"
    },
    {
      colId: "lifeStatus",
      field: "lifeStatus"
    },
    {
      colId: "validSince",
      field: "validSince"
    }
  ]

  get rickAndMortyCharactersQuery() {
    return this._rickAndMortyService.query;
  }

}
