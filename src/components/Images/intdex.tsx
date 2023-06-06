import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface ImageProps{
  src: string,
  alt?: string
}

export const Image = component$<ImageProps>(({src, alt}) => {
  const isLoaded = useSignal(false)
  const hasError = useSignal(false)
  const file = useSignal('')
  const hidden = isLoaded.value ? '' : 'hidden'
  

  useTask$(({track}) => {
    track(() => src)
    isLoaded.value = false 
    
    if(!file.value){
      const fileNameAndExtension = src.split('/').at(-1)
      if(fileNameAndExtension){
        const [name] = fileNameAndExtension.split('.')
        file.value = `/images/characters/${name}.webp`
      }else{
        file.value = src
      }
      
    }

    track(() => hasError.value)
    if(hasError.value && file.value !== src){
      file.value = src
      hasError.value = false
    }
  })

  return (
    <picture class='w-full h-full flex items-center justify-center'>
      {!isLoaded.value && <div class='inline-block relative w-20 h-20 after:block after:rounded-[50%] after:w-0 after:h-0 after:m-2 after:border-white after:border-[32px] after:border-solid after:border-t-white after:border-r-transparent after:border-b-white after:border-l-transparent animate-spin '></div>
      
      }   

      <img 
        class={ `w-full h-full object-cover ${hidden} ` } 
        width='100%' height='100%'  
        src={file.value} 
        alt={alt} 
        onLoad$={() => isLoaded.value = true} 
        onError$={() => hasError.value = true } />
      
    </picture>
  )
});