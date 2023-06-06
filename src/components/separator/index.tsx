import { component$ } from '@builder.io/qwik';

interface SeparatorProps{
  width?: string;
  height?: string;
}

export const Separator = component$<SeparatorProps>(({width = null, height = null}) => {
  return <div 
    style={{
      width: width ?? 0,
      height: height ?? 0
    }}>

  </div>
});