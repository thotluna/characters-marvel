import { useContext } from "@builder.io/qwik";
import { messageContext } from "~/contexts/message-context";


export function useMessageContext(){
  const messageStore = useContext(messageContext)

  if(!messageStore) {
    console.error('Does not exist any message store')
  }

  return messageStore
}
