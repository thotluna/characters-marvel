import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';

export default component$(() => {
  return (
    <>
      <Header />
      <main class='container p-8 flex-1 w-full'>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
