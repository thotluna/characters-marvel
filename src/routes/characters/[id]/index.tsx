import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useCharacterContext } from "~/hooks/use-character-context";
import {
  type DocumentHead,
  server$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import type { ICharacter, IDataWrapper } from "~/types/characters";
import { ENDPOINT_CHARACTERS } from "~/constants";
import { getHash } from "~/services/get-hash";
import { HeaderCharacter } from "~/components/header-character";
import { Separator } from "~/components/separator";
import { ComicsGrid } from "~/components/comics-grid";
import { useMessageContext } from "~/hooks/use-message-context";

export default component$(() => {
  const location = useLocation();
  const nav = useNavigate();
  const character = useSignal<ICharacter>();
  const { selected } = useCharacterContext();
  const { setError } = useMessageContext()
  
  useTask$(async () => {
    const id = location.params.id;
    if (selected.character) {
      character.value = selected.character;
    } else {
      const data = await getCharacter({ id });
      if(!data){
        setError('Error. dont have key token')
        console.error('Error. dont have key token')
        nav('characters')
      }else{
        if(data.code !== 200 ){
          setError(data.status ?? 'Error')
          console.error(data.status)
          nav('characters')
        }else{
          if (!data.data?.results) {
            nav("/characters");
          } else {
            character.value = data?.data?.results[0];
          }

        }
      }
      
    }
  });

  return (
    <>
      {character.value && (
        <>
          <HeaderCharacter character={character.value} />
          <Separator height="4rem" />
          <ComicsGrid id={character.value.id || 0} />
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Character of Marvel",
  meta: [
    {
      name: "Marvel Characters",
      content: "List of characters from Marvel",
    },
  ],
};

interface GetCharacterProps {
  id: string;
}

const getCharacter = server$(async function ({
  id,
}: GetCharacterProps): Promise<IDataWrapper<ICharacter> | null> {
  const privateKey = this.env.get('API_TOKEN_KEY')

  if(!privateKey){ 
    console.error('Error. dont have API_TOKEN_KEY');
    return null
  }

  const { hash, publicToken, ts } = getHash(privateKey );

  const url = new URL(
    `https://gateway.marvel.com:443/v1/public/${ENDPOINT_CHARACTERS}/${id}`
  );

  url.searchParams.append("ts", `${ts}`);
  url.searchParams.append("apikey", `${publicToken}`);
  url.searchParams.append("hash", `${hash}`);

  try {
    const res = await fetch(url, {
      method: "GET",
    });

    const data = await res.json();  
    console.log(data);
    
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
});
