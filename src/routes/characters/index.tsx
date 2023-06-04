import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { DocumentHead, server$ } from '@builder.io/qwik-city';

import MD5 from 'crypto-js/md5';

import type { ICharacterDataWrapper } from '~/types/characters';

export default component$(() => {

  const page = useSignal(0)
  const storage = useSignal<ICharacterDataWrapper | null>()

  useTask$(async ({track}) => {
    track(() => page.value)
    console.log(page.value)
    const data = await getCharacters({page: page.value})
    storage.value = data

    console.log(data);
    
  })

  return (
    <>
    <h2>{storage.value?.data?.offset} / {storage.value?.data?.total}</h2>
    <div>
      <button onClick$={() => page.value = --page.value}>Anterior</button>
      <button onClick$={() => page.value = ++page.value}>Siguiente</button>
    </div>
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