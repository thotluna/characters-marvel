import { $, useContext } from "@builder.io/qwik";
import { COLOR_MESSAGE } from "~/components/message";
import { messageContext } from "~/contexts/message-context";


export function useMessageContext(){
  const messageStore = useContext(messageContext)

  if(!messageStore) {
    console.error('Does not exist any message store')
  }

  const setError = $((message: string) =>{
    messageStore.color = COLOR_MESSAGE.ERROR
    messageStore.message = message
  }) 

  const clear = $(() => {
    messageStore.color = COLOR_MESSAGE.INFO
    messageStore.message = ''
  })

  const setInfo = $((message: string) =>{
    messageStore.color = COLOR_MESSAGE.INFO
    messageStore.message = message
  })

  return {messageStore, clear, setInfo, setError}
}
