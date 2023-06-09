import { component$, type Signal } from "@builder.io/qwik";
import { useCharacterContext } from "~/hooks/use-character-context";
import { type ICharacter } from "~/types/characters";
import { Image } from "../Images/intdex";

interface CharacterComponentProps {
  character: ICharacter;
  ref: Signal<Element | undefined>;
  onClickCharacter: (id?: number) => void;
}

export const CharacterComponent = component$<CharacterComponentProps>(
  ({ character, ref, onClickCharacter }) => {
    const srcImage =
      `${character.thumbnail?.path}.${character.thumbnail?.extension}` ||
      "/images/header.webp";
    const [name, last] = character.name?.split("(") || ["", ""];
    const alias = last?.replace(/\)/g, "") ?? "";

    const { onChange } = useCharacterContext();

    return (
      <article
        ref={ref}
        onClick$={() => {
          onChange(character);
          onClickCharacter(character.id);
        }}
        class="relative max-w-xs justify-self-center self-center bg-stone-950 w-full h-96 overflow-hidden rounded-t-3xl before:absolute before:top-0 before:right-0 before:w-full before:h-1/2 before:bg-red-600 before:transition-all before:duration-200  hover:before:absolute hover:before:top-0 hover:before:right-0 hover:before:w-full hover:before:h-96 hover:before:bg-red-600 after:absolute after:overflow-hidden after:bottom-0 after:right-0 after:top-auto after:border-t-transparent after:border-r-slate-800 after:border-b-transparent after:border-l-transparent   after:border-t-[12px] after:border-r-[12px] after:border-b-0 after:border-l-0 group"
      >
        <header class="relative w-full h-[11.5rem] overflow-hidden transition transform duration-200 ease-linear group-hover:scale-110">
          <Image src={srcImage} alt={character.name} />
        </header>
        <footer class="relative w-full h-[11.5rem] flex flex-col justify-between p-4 text-slate-200 ">
          <h2 class="text-xl group-hover:text-slate-900 uppercase ">{name}</h2>
          <h3 class="text-base px-4 text-slate-400 group-hover:text-slate-700 text-right">
            {alias}
          </h3>
        </footer>
      </article>
    );
  }
);
