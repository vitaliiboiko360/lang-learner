import React from 'react';
import { forwardRef } from 'react';

const Audio = forwardRef((props, ref) => {
  const src = `data/${props.audio}`;
  return (<audio ref={ref} src={src} type="audio/mpeg" {...props} ></audio>);
});


export default Audio;