import { z } from "zod";

export const RickAndMortyCharacterResponseSchema = z.object({
    results: z.array(
        z.object({
            id: z.number().min(1),
            name: z.string(),
            status: z.enum(["Alive", "Dead", "unknown"]),
            origin: z.object({
                name: z.string(),
                url: z.union([z.string().url(), z.literal("")])
            }),
            url: z.string().url()
        })
    )
});

// Weird typescript does not have it
type ArraySubType<T> = T extends (infer S)[] ? S : never

export type RickAndMortyCharacterResponse = z.infer<typeof RickAndMortyCharacterResponseSchema>
export type RickAndMortyCharacter = ArraySubType<RickAndMortyCharacterResponse["results"]>;

