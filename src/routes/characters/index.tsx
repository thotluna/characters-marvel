import { component$, useContextProvider, useSignal, useStore, useTask$, useVisibleTask$, $ } from '@builder.io/qwik';
import { type DocumentHead, server$, useNavigate } from '@builder.io/qwik-city';

import MD5 from 'crypto-js/md5';
import { CharactersList } from '~/components/Characters';

import type { ICharacter, ICharacterDataWrapper } from '~/types/characters';
import { characterContext } from '../../contexts/character-context';

export default component$(() => {

  const page = useSignal(0)
  const flatElement = useSignal<HTMLElement>()
  const storage = useSignal<ICharacterDataWrapper | null>()

  useTask$(async ({track}) => {
    track(() => page.value)
    console.log(page.value)
    const data = await getCharacters({page: page.value})
    if(storage.value?.data?.results && data?.data?.results){
      const oldResult: ICharacter[] = storage.value.data.results
      storage.value= data
      if(storage.value.data && storage.value.data.results){
        storage.value.data.results = [...oldResult, ...storage.value.data.results]
      }
    }else{
      storage.value = data    
    }
  })

  const characterSelected = useStore<{character?: ICharacter}>({})
  useContextProvider(characterContext, characterSelected)
  const nav = useNavigate()

  useVisibleTask$(({track, cleanup}) => {

    track(() => flatElement.value)

    const observer = new IntersectionObserver( (entries) => {
      if(entries[0]?.isIntersecting){
        page.value = ++page.value
      }
    }, {
      rootMargin: "500px",
      threshold: 0,
    })

    if(flatElement?.value) observer.observe(flatElement.value)

    cleanup(() => observer.disconnect)
  })

  const handlerOnClickItem = $((id?: number) => {
    if(id) nav(id.toString())
  })


  return (
    <>
    <section class=' w-full p-8 justify-center items-center '>
      <CharactersList 
        onClickItem={ handlerOnClickItem }
        ref={flatElement} 
        list={storage.value?.data?.results}/>
    </section>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Marvel Characters',
  meta: [
    {
      name: 'Marvel Characters',
      content: 'List of characters from Marvel',
    },
  ],
};

interface GetCharactersProps{
  page?: number
  query?: string
}

const ENDPOINT_CHARACTERS = 'characters'

const getCharacters = server$(async function ({page = 0, query}: GetCharactersProps): Promise<ICharacterDataWrapper | null> {
  const LIMIT = 20

  const privateToken = this.env.get('API_TOKEN_KEY') ?? ''
  const publicToken = this.env.get('VITE_API_TOKEN_KEY')

  const ts = new Date().getTime()
  const hash = MD5(ts + privateToken + publicToken)

  const url = new URL(`https://gateway.marvel.com:443/v1/public/${ENDPOINT_CHARACTERS}`)

  if(page > 0){
    const offset = page * LIMIT
    url.searchParams.append('offset', `${offset}`)
    url.searchParams.append('limit', `${LIMIT}`)
  }

  if(query){
    url.searchParams.append('query', query)
  }

  url.searchParams.append('ts', `${ts}`)
  url.searchParams.append('apikey', `${publicToken}`)
  url.searchParams.append('hash', `${hash}`)

  console.log({url})

  try {
    const res = await fetch(url, {
      method: "GET",
    });
       
    const data = await res.json();
    return data
  } catch (error) {
    console.error(error)
    return null
  }
})