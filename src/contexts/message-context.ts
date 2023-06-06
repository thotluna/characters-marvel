import { createContextId } from "@builder.io/qwik";

export const messageContext = createContextId<{
  message?: string;
  color: string;
}>("message-context");
