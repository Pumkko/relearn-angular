import { Routes } from '@angular/router';
import { RickAndMortyCharactersGridComponent } from './rickAndMorty/components/rick-and-morty-characters-grid/rick-and-morty-characters-grid.component';

export const routes: Routes = [
    {
        path: 'rickAndMorty', children: [{
            path: 'characters', component: RickAndMortyCharactersGridComponent
        }]
    }
];
