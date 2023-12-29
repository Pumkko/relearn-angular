import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom, map } from 'rxjs';
import { ZodError } from 'zod';
import { RickAndMortyCharacterResponseSchema } from './rick-and-morty-character';
import { environment } from '../../../environments/environment';


@Injectable()
export class RickAndMortyService {
  http = inject(HttpClient)

  query = injectQuery(() => ({
    queryKey: ['rickAndMortyCharacter'],
    queryFn: () => this.fetchCharacters(),
    retry(failureCount, error) {
      console.error(error);
      if (error instanceof ZodError) {
        return false;
      }

      return failureCount < 2;
    },

  }))

  private charactersEndpoint = new URL('/Character', environment.apiConfig.uri);

  private fetchCharacters() {
    return lastValueFrom(
      this.http.get<unknown>(this.charactersEndpoint.toString())
        .pipe(map(result => {
          const parsed = RickAndMortyCharacterResponseSchema.safeParse(result);
          if (!parsed.success) {
            throw parsed.error;
          }

          return parsed.data;
        }))
    )
  }

}
