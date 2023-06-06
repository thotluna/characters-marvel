import { useContext, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { characterContext } from "~/contexts/character-context";
import type { ICharacter } from "~/types/characters";


export function useCharacterContext(){
  const selected = useContext(characterContext)
  const nav = useNavigate()

  if(!selected){
    console.error('DOes not have Context Provider of Character Context')
    nav('/character')
  }

  const onChange = $((character: ICharacter) => {
    selected.character = character
  })

  return {selected, onChange}
}