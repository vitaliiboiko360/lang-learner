import React from 'react'
import { forwardRef } from 'react';

import SpeedIcon from '@mui/icons-material/Speed';

const valuesArrayLength = 3;
const values = [1.0, 0.85, 0.7];

const PlaybackRateDropdown = forwardRef((props, ref) => {
  const ul = React.useRef(null);
  const opened = React.useRef(null);
  const button = React.useRef(null);

  let playbackRate = ref.current ? ref.current.playbackRate : 1;


  React.useEffect(() => {
    playbackRate = ref.current ? ref.current.playbackRate : 1;
  }, [playbackRate]);

  const toggleFunc = () => {
    if(!opened.current){
      button.current.classList.add('opened');
      opened.current = true;
    } else {
      button.current.classList.remove('opened');
      opened.current = false;
    }
  }
  const onClick = (e, value) => {
    e.stopPropagation();
    if(opened.current){
      if (ref.current) { ref.current.playbackRate = value; }
      const calcTranslate = 36 * values.findIndex((v) => v === value)
      ul.current.style.transform = `translateY(-${calcTranslate}px)`;
    }
    toggleFunc()
  };

  
  return (
    <button onClick={toggleFunc} className='btn btn-sm btn-change-speed' ref={button}>
      <span>
        <span  className='btn-change-speed--container'>
          <ul ref={ul} 
          // style={{transform: `translateY(${20 * values.findIndex((v) => v === playbackRate)})`}}
          >
            {values.map((value, index) => {
              return (<li
                // style={(value != playbackRate) ? { ...styleObj, ...{ 'display': 'none' } } : styleObj}
                onClick={(e) => onClick(e, value)}
                data-value={value}
                key={index}
              >{value}</li>)
            })}
          </ul>
        </span >
        
        <SpeedIcon>Playback Speed</SpeedIcon>
      </span>
    </button>
  )
});

export default PlaybackRateDropdown;