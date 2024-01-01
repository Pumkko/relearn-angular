import { z } from "zod";
import { LifeStatus } from "./rick-and-morty-character";

export const AddNewCharacterSchema = z.object({
    name: z.string(),
    lifeStatus: z.nativeEnum(LifeStatus),
    origin: z.string(),
    species: z.string()
});

export type AddNewCharacter = z.infer<typeof AddNewCharacterSchema>;