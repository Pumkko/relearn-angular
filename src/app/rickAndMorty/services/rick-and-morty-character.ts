import { z } from "zod";

export const RickAndMortyCharacterResponseSchema = z.array(
        z.object({
            id: z.string().uuid(),
            name: z.string(),
        })
    )

// Weird typescript does not have it
type ArraySubType<T> = T extends (infer S)[] ? S : never

export type RickAndMortyCharacterResponse = z.infer<typeof RickAndMortyCharacterResponseSchema>
export type RickAndMortyCharacter = ArraySubType<RickAndMortyCharacterResponse>;

