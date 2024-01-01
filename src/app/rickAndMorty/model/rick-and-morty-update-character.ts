import { z } from "zod";
import { LifeStatus } from "./rick-and-morty-character";

export const UpdateCharacterSchema = z.object({
    characterId: z.string().uuid(),
    newLifeStatus: z.nativeEnum(LifeStatus)
});

export type UpdateCharacter = z.infer<typeof UpdateCharacterSchema>;