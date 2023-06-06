import { createContextId } from "@builder.io/qwik";
import type { ICharacter } from "~/types/characters";

export const characterContext = createContextId<{ character?: ICharacter }>(
  "character-context"
);
