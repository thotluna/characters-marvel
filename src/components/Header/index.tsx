import { component$ } from '@builder.io/qwik';
import { MarvelLogo } from '~/components/icons';

export const Header = component$(() => {
  return (
    <header class='relative  text-slate-100 w-full h-48 flex items-center justify-center'>
      <div class='w-full h-full bg-[url("/images/header.webp")] bg-no-repeat bg-cover bg-center absolute top-0 bottom-0 left-0 right-0 '>

      </div>
      <div class='w-full h-full bg-slate-800 backdrop-blur-sm opacity-70 bg-no-repeat bg-cover bg-center absolute top-0 bottom-0 left-0 right-0 z-10 '>

      </div>
      <div class='p-8 z-20'>
        <MarvelLogo width={260} height={104} />
      </div>
    </header>
  )
});