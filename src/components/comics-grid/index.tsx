import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { ENDPOINT_CHARACTERS, ENDPOINT_COMICS } from "~/constants";
import { useMessageContext } from "~/hooks/use-message-context";
import { getHash } from "~/services/get-hash";
import type { IComic, IDataWrapper } from "~/types/characters";
import { ItemComic } from "../item-comic";
import { Label } from "../label";
import { COLOR_MESSAGE } from "../message";
import { Separator } from "../separator";

export interface ComicsGridProps {
  id: number;
}

export const ComicsGrid = component$<ComicsGridProps>(({ id }) => {
  const comics = useSignal<IComic[]>();
  const storeMessage = useMessageContext()

  useTask$(async () => {
    const res = await getCharacterComics({ id: id.toString() });
    if(!res){
      storeMessage.color = COLOR_MESSAGE.ERROR
      storeMessage.message = 'Error. dont have key token'
    }
    comics.value = res?.data?.results;
  });

  return (
    <section>
      <header>
        <Label>Comics</Label>
        <Separator height="2rem" />
      </header>
      {(!comics.value || comics.value.length == 0) && (
        <h2>Does not any comics for this character</h2>
      )}
      <section
        class="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))" }}
      >
        {comics.value &&
          comics.value.length > 0 &&
          comics.value.map((comic) => {
            return (
              <ItemComic key={comic.id} src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`} title={comic.title} />
            );
          })}
      </section>
    </section>
  );
});

const getCharacterComics = server$(async function ({
  id,
}: {
  id: string;
}): Promise<IDataWrapper<IComic> | null> {
  
  const privateKey = this.env.get('API_TOKEN_KEY')

  if(!privateKey){ 
    console.error('Error. dont have API_TOKEN_KEY');
    
    return null
  
  }

  const { hash, publicToken, ts } = getHash(privateKey );

  const url = new URL(
    `https://gateway.marvel.com:443/v1/public/${ENDPOINT_CHARACTERS}/${id}/${ENDPOINT_COMICS}`
  );

  url.searchParams.append("ts", `${ts}`);
  url.searchParams.append("apikey", `${publicToken}`);
  url.searchParams.append("hash", `${hash}`);

  try {
    const res = await fetch(url, {
      method: "GET",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
});
