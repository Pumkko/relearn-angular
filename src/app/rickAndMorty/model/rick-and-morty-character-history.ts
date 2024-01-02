import { z } from "zod";
import { LifeStatus, RickAndMortySingleCharacterSchema } from "./rick-and-morty-character";


export const RickAndMortyCharacterHistoryResponseSchema = z.object({
    characterOutput: RickAndMortySingleCharacterSchema,
    lifeStatusHistory: z.array(z.object({
        lifeStatus: z.nativeEnum(LifeStatus),
        validFrom: z.string().datetime(),
        validTo: z.string().datetime(),
    }))
    
})


export type RickAndMortyCharacterHistoryResponse = z.infer<typeof RickAndMortyCharacterHistoryResponseSchema>

