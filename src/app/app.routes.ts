import { Routes } from '@angular/router';
import { RickAndMortyCharactersGridComponent } from './rickAndMorty/components/rick-and-morty-characters-grid/rick-and-morty-characters-grid.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginFailedComponent } from './login-failed/login-failed.component';


export const routes: Routes = [
    {
        path: 'rickAndMorty', canActivate: [MsalGuard], children: [{
            path: 'characters', component: RickAndMortyCharactersGridComponent
        }],

    },
    {
        path: 'login-failed',
        component: LoginFailedComponent
    }
];
