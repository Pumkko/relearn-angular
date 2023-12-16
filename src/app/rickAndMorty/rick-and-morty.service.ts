import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom, map } from 'rxjs';
import { ZodError } from 'zod';
import { RickAndMortyCharacterResponseSchema } from './services/rick-and-morty-character';


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

  private fetchCharacters() {
    return lastValueFrom(
      this.http.get<unknown>('https://rickandmortyapi.com/api/character')
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
