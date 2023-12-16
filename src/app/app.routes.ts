import { Routes } from '@angular/router';
import { RickAndMortyCharactersGridComponent } from './rickAndMorty/components/rick-and-morty-characters-grid/rick-and-morty-characters-grid.component';
import { authMatchGuard } from './auth-match.guard';


export const routes: Routes = [
    {
        path: 'rickAndMorty', canActivate:[authMatchGuard], children: [{
            path: 'characters', component: RickAndMortyCharactersGridComponent
        }]
    }
];
