import { z } from "zod";
import { LifeStatus } from "./rick-and-morty-character";

export const AddNewCharacterSchema = z.object({
    name: z.string().min(1),
    lifeStatus: z.nativeEnum(LifeStatus),
    origin: z.string().min(1),
    species: z.string().min(1)
});

export type AddNewCharacter = z.infer<typeof AddNewCharacterSchema>;