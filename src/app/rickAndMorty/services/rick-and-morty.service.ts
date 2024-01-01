import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom, map } from 'rxjs';
import { ZodError, z } from 'zod';
import { RickAndMortyCharacterResponseSchema } from './rick-and-morty-character';
import { environment } from '../../../environments/environment';
import { AddNewCharacter } from './rick-and-morty-add-character';
import { UpdateCharacter } from './rick-and-morty-update-character';


@Injectable({
  providedIn: 'root'
})
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


  addNewCharacterMutation = injectMutation((queryClient) => ({
    mutationFn: (body: AddNewCharacter) => {
      const charactersEndpoint = new URL('/Character', environment.apiConfig.uri);
      return lastValueFrom(this.http.post(charactersEndpoint.toString(), body))
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['rickAndMortyCharacter'] })
    }
  }))

  updateCharacterMutation = injectMutation((queryClient) => ({
    mutationFn: (body: UpdateCharacter) => {
      const charactersEndpoint = new URL('/Character', environment.apiConfig.uri);
      return lastValueFrom(this.http.put(charactersEndpoint.toString(), body))
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['rickAndMortyCharacter'] })
    }
  }))

  private fetchCharacters() {
    const charactersEndpoint = new URL('/Character', environment.apiConfig.uri);
    return lastValueFrom(
      this.http.get<unknown>(charactersEndpoint.toString())
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
