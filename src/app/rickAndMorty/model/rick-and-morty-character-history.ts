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

// Weird typescript does not have it
type ArraySubType<T> = T extends (infer S)[] ? S : never

export type RickAndMortyCharacterHistoryResponse = z.infer<typeof RickAndMortyCharacterHistoryResponseSchema>
export type LifeStatusHistory = ArraySubType<RickAndMortyCharacterHistoryResponse["lifeStatusHistory"]>

