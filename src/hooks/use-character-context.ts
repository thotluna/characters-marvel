import { useContext, $ } from "@builder.io/qwik";
import { characterContext } from "~/contexts/character-context";
import type { ICharacter } from "~/types/characters";


export function useCharacterContext(){
  const selected = useContext(characterContext)

  const onChange = $((character: ICharacter) => {
    selected.character = character
  })

  return {selected, onChange}
}