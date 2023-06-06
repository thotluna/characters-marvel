import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useMessageContext } from "~/hooks/use-message-context";

export const COLOR_MESSAGE = {
  INFO: "bg-emerald-500",
  ERROR: "bg-red-500",
};

export const MessageComponent = component$(() => {
  const { messageStore, clear } = useMessageContext();
  const isShowMessage = useSignal(false);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => messageStore.message);
    if (messageStore.message) {
      isShowMessage.value = true;
    } else {
      isShowMessage.value = false;
    }

    const interval = setInterval(() => {
      clear();
    }, 3000);
    cleanup(() => clearInterval(interval));
  });

  return (
    <>
      {isShowMessage.value && (
        <article class="absolute bottom-0 left-0 right-0 w-full flex items-center justify-center p-8">
          <div class={`relative px-16 py-4 rounded ${messageStore.color}`}>
            <div class="absolute top-0 right-1">
              <button
                onClick$={() => (messageStore.message = "")}
                class="text-xs text-slate-950"
              >
                X
              </button>
            </div>
            <div class="text-slate-900">{messageStore.message}</div>
          </div>
        </article>
      )}
    </>
  );
});
