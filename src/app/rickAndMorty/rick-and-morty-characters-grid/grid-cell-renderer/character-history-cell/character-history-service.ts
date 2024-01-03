import { HttpClient } from "@angular/common/http";
import { Injectable, computed, inject } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { lastValueFrom, map } from "rxjs";
import { ZodError } from "zod";
import { environment } from "../../../../../environments/environment";
import { RickAndMortyCharacterHistoryResponseSchema } from "../../../zod-schema/rick-and-morty-character-history";
import { DisplayHistoryModalService } from "./display-history-modal.service";

@Injectable({
    providedIn: 'root'
})
export class CharacterHistoryService {
    historyModalService = inject(DisplayHistoryModalService);
    characterId = computed(() => this.historyModalService.currentlySelectedCharacter()?.id ?? "");

    http = inject(HttpClient);
    historyQuery = injectQuery(() => ({
        queryKey: ['rickAndMortyCharacterHistory', this.characterId()],
        queryFn: () => this.fetchCharacterHistory(this.characterId()),
        enabled: this.characterId() !== "",
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