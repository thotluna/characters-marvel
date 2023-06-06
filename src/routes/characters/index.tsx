import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import { type DocumentHead, server$, useNavigate } from "@builder.io/qwik-city";
import { CharactersList } from "~/components/Characters";
import { ENDPOINT_CHARACTERS } from "~/constants";
import { useMessageContext } from "~/hooks/use-message-context";
import { getHash } from "~/services/get-hash";

import type { ICharacter, IDataWrapper } from "~/types/characters";

export default component$(() => {
  const page = useSignal(0);
  const flatElement = useSignal<HTMLElement>();
  const storage = useSignal<IDataWrapper<ICharacter> | null>();
  const { setError } = useMessageContext();

  useTask$(async ({ track }) => {
    track(() => page.value);
    const data = await getCharacters({ page: page.value });
    if (!data) {
      setError("Error. dont have key token");
    }
    if (storage.value?.data?.results && data?.data?.results) {
      const oldResult: ICharacter[] = storage.value.data.results;
      storage.value = data;
      if (storage.value.data && storage.value.data.results) {
        storage.value.data.results = [
          ...oldResult,
          ...storage.value.data.results,
        ];
      }
    } else {
      storage.value = data;
    }
  });

  const nav = useNavigate();

  useVisibleTask$(({ track, cleanup }) => {
    track(() => flatElement.value);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          page.value = ++page.value;
        }
      },
      {
        rootMargin: "500px",
        threshold: 0,
      }
    );

    if (flatElement?.value) observer.observe(flatElement.value);

    cleanup(() => observer.disconnect);
  });

  const handlerOnClickItem = $((id?: number) => {
    if (id) nav(id.toString());
  });

  return (
    <>
      <section class=" w-full p-8 justify-center items-center ">
        <CharactersList
          onClickItem={handlerOnClickItem}
          ref={flatElement}
          list={storage.value?.data?.results}
        />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Marvel Characters",
  meta: [
    {
      name: "Marvel Characters",
      content: "List of characters from Marvel",
    },
  ],
};

interface GetCharactersProps {
  page?: number;
  query?: string;
}

const getCharacters = server$(async function ({
  page = 0,
  query,
}: GetCharactersProps): Promise<IDataWrapper<ICharacter> | null> {
  const LIMIT = 20;
  const privateKey = this.env.get("API_TOKEN_KEY");

  if (!privateKey) {
    console.error("Error. dont have API_TOKEN_KEY");

    return null;
  }

  const { hash, publicToken, ts } = getHash(privateKey);

  const url = new URL(
    `https://gateway.marvel.com:443/v1/public/${ENDPOINT_CHARACTERS}`
  );

  if (page > 0) {
    const offset = page * LIMIT;
    url.searchParams.append("offset", `${offset}`);
    url.searchParams.append("limit", `${LIMIT}`);
  }

  if (query) {
    url.searchParams.append("query", query);
  }

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
