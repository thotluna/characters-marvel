import { component$ } from '@builder.io/qwik';
import type { ICharacter } from '~/types/characters';
import { CharacterComponent } from '../character';

interface CharaqcterListProps{
  list?: ICharacter[] 
}
export const CharactersList = component$<CharaqcterListProps>(({list}) => {
  
  if(!list || list.length === 0) return <h2>Does not have any character</h2>
  
  return (
    <div 
      class=' w-full grid  gap-8' 
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))"}}>
      {
        list.map(character => {
          return <CharacterComponent 
                  key={character.id} 
                  character={character} />
        })
      }
  </div>
    )
});