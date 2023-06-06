import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { COLOR_MESSAGE, MessageComponent } from "./components/message";
import { RouterHead } from "./components/router-head/router-head";
import { characterContext } from "./contexts/character-context";
import { messageContext } from "./contexts/message-context";

import "./global.css";
import type { ICharacter } from "./types/characters";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  const characterSelected = useStore<{ character?: ICharacter }>({});
  useContextProvider(characterContext, characterSelected);

  const messageStore = useStore<{ message?: string, color: string }>({message: '', color: COLOR_MESSAGE.INFO})
  useContextProvider(messageContext, messageStore)

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body
        lang="en"
        class="relative bg-slate-800 text-slate-300  h-screen flex flex-col gap-8"
      >
        <RouterOutlet />
        <MessageComponent />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
