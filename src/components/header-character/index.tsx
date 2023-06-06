import { component$ } from '@builder.io/qwik';
import type { ICharacter } from '~/types/characters';

interface HeaderCharacterProps{
  character: ICharacter
}


export const HeaderCharacter = component$<HeaderCharacterProps>(({character}) => {
  const [name, alias] = character.name?.replace(')', '').split('(') ?? ['', '']
  const modified = character.modified? new Date(character.modified).toLocaleDateString() : ""
  return (
    <section class='w-full  flex flex-col-reverse md:h-[400px] md:flex-row justify-between bg-slate-950'>
      <article class='relative min-w-[320px] max-w-3xl after:bg-transparent after:absolute after:border-t-[30px] after:border-t-slate-950 after:border-r-[310px] after:border-r-transparent after:block after:h-0   after:w-0    after:left-[0%]  after:botton-0  md:after:border-t-0 md:border-t-transparent md:after:border-b-[400px] md:after:border-b-slate-950
      md:after:border-r-[100px] md:after:border-r-transparent md:after:left-[100%] md:after:top-0 '>
        
        <header class='flex flex-col w-full items-start mx-16 mt-16'>
          <h1 class='text-4xl md:text-7xl text-red-600 '>{name}</h1>
          <h2 class='text-base md:text-4xl '>{alias}</h2>
          <span class='text-sm '>{character.id}</span>
          <span class='text-sm '>{modified}</span>
        </header>
        <footer class='mt-8 mx-16 mb-16'>
          <p>{character.description ? character.description : 'Does not have any description'}</p>
        </footer>
      </article>
      <img width='' height='' class='w-full min-h-[300px] flex-1 object-cover justify-self-end' src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`} alt={character.name} />
    </section>
  )
});