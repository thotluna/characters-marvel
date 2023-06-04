import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';

export default component$(() => {
  return (
    <>
      <Header />
      <main class='flex-1 w-full h-full'>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
