import { $, Signal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { ICharacter } from '~/types/characters';
import { CharacterComponent } from '../character';

interface CharaqcterListProps{
  list?: ICharacter[] 
  ref: Signal<Element | undefined>
  onClickItem: (id?: number) => void
}
export const CharactersList = component$<CharaqcterListProps>(({list, ref, onClickItem}) => {
  
  if(!list || list.length === 0) return <h2>Does not have any character</h2>
  
  return (
    <div 
      class=' w-full grid  gap-8' 
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))"}}>
      {
        list.map(character => {
          return <CharacterComponent 
                  onClickCharacter = {$((id?: number) => onClickItem(id))}
                  ref={ref}
                  key={character.id} 
                  character={character} />
        })
      }
  </div>
    )
});