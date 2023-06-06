import { component$ } from '@builder.io/qwik';
import { Separator } from '../separator';

export interface ItemComicProps {
  src: string
  title?: string
}

export const ItemComic = component$<ItemComicProps>(({src, title }) => {
  return (
    <article class='relative bg-slate-950 p-4 rounded-t-3xl after:absolute after:overflow-hidden after:bottom-0 after:right-0 after:top-auto after:border-t-transparent after:border-r-slate-800 after:border-b-transparent after:border-l-transparent   after:border-t-[12px] after:border-r-[12px] after:border-b-0 after:border-l-0 '>
      <heaader>
        <img class='object-cover rounded-t-xl' width={164} height={250} src={src} alt={title} />
      </heaader>
      <Separator height='1rem' />
      <footer>
        <h3 class='w-full text-center text-xs'>{title}</h3>
      </footer>
    </article>
  );
});