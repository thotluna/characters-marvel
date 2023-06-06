import { component$, Slot } from '@builder.io/qwik';

export const Label = component$(() => {
  return (
    <div class='flex flex-row items-center bg-red-600'>
      <div class='relative bg-slate-950 after:bg-transparent after:border-b-slate-950 after:border-b-[4.5rem] after:border-r-[2rem] after:border-r-transparent after:block after:h-0 after:left-[100%] after:absolute after:top-0 after:transition after:duration-500 after:ease-linear after:w-0'>
        <h2 class='p-4 text-4xl text-red-600'>
          <Slot />
        </h2>
      </div>
      <div class='bg-red-600 w-[50%] h-full'></div>
    </div>
  );
});