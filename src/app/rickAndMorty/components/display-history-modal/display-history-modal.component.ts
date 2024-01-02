import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RickAndMortyCharacterHistoryResponseSchema } from '../../model/rick-and-morty-character-history';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { DisplayHistoryModalService } from '../../services/display-history-modal.service';
import { lastValueFrom, map } from 'rxjs';
import { ZodError } from 'zod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-history-modal',
  standalone: true,
  imports: [],
  templateUrl: './display-history-modal.component.html',
})
export class DisplayHistoryModalComponent {

  historyModalService = inject(DisplayHistoryModalService);
  http = inject(HttpClient);

  historyQuery = injectQuery(() => ({
    queryKey: ['rickAndMortyCharacterHistory'],
    queryFn: () => this.fetchCharacterHistory(this.historyModalService.currentlySelectedCharacter()?.id ?? ""),
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


}
