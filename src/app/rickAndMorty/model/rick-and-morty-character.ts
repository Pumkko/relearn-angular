import { z } from "zod";

export enum LifeStatus
{
    Alive = 0,
    Dead = 1,
    Unknown = 2,
}

export const RickAndMortyCharacterResponseSchema = z.array(
    z.object({
        id: z.string().uuid(),
        name: z.string(),
        lifeStatus: z.nativeEnum(LifeStatus),
        origin: z.string(),
        species: z.string(),
        validSince: z.string().datetime()

    })
)

// Weird typescript does not have it
type ArraySubType<T> = T extends (infer S)[] ? S : never

export type RickAndMortyCharacterResponse = z.infer<typeof RickAndMortyCharacterResponseSchema>
export type RickAndMortyCharacter = ArraySubType<RickAndMortyCharacterResponse>;

