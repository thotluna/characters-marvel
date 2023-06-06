import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';
import { ENDPOINT_CHARACTERS, ENDPOINT_COMICS } from '~/constants';
import { getHash } from '~/services/get-hash';
import type { IComic, IDataWrapper } from '~/types/characters';
import { Image } from '../Images/intdex';
import { Label } from '../label';

export interface ComicsGridProps {
  id: number
}

export const ComicsGrid = component$<ComicsGridProps>(({id}) => {
  const comics = useSignal<IComic[]>()
  
  useTask$(async () => {
    const res = await getCharacterComics({id: id.toString()})
    comics.value = res?.data?.results
  })
  
  return (
    <section>
      <header>
        <Label>
          Comics
        </Label>
      </header>
      {(!comics.value ||  comics.value.length == 0) && <h2>Does not any comics for this character</h2>}
      <section class=' grid gap-4' style={{ gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))"}}>
      {comics.value && comics.value.length > 0 && comics.value.map((comic) => {
          return ( 
            <article key={comic.id} class='self-top justify-self-center p-4' >
              <div class='w-[164px] h-[250px]'>
                <Image src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`} />
              </div>
              <h2 class='w-full text-center mt-4'>{comic.title}</h2>
            </article>
          )
        })
      }
      </section>
    </section>
  );
});

const getCharacterComics = server$(async function ({id}: {id:string}): Promise<IDataWrapper<IComic> | null> {

  const { hash, publicToken, ts } = getHash()

  const url = new URL(`https://gateway.marvel.com:443/v1/public/${ENDPOINT_CHARACTERS}/${id}/${ENDPOINT_COMICS}`)

  url.searchParams.append('ts', `${ts}`)
  url.searchParams.append('apikey', `${publicToken}`)
  url.searchParams.append('hash', `${hash}`)

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