import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';

export default component$(() => {
  return (
    <>
      <Header />
      <main class='container mx-auto px-16'>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
