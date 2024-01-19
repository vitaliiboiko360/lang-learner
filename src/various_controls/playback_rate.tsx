import React from 'react'
import { forwardRef } from 'react';

import SpeedIcon from '@mui/icons-material/Speed';

const valuesArrayLength = 3;
const values = [1.0, 0.85, 0.7];
const ulElementStyle = {
  'listStyle': 'none',
  'fontSize': '1.5em',
}

const PlaybackRateDropdown = forwardRef((props, ref) => {
  const liItems = React.useRef(null);

  let playbackRate = ref.current ? ref.current.playbackRate : 1;

  function getRefArray() {
    if (!liItems.current) {
      liItems.current = new Array(valuesArrayLength);
    }
    return liItems.current;
  }

  React.useEffect(() => {
    playbackRate = ref.current ? ref.current.playbackRate : 1;
  }, [playbackRate]);

  const onClick = (value) => {
    liItems.current.forEach((li) => {
      if (li != null) {
        var style = window.getComputedStyle(li);

        if (li.getAttribute('data-value') == value) {
          li.style.display = 'table-cell';
          if (ref.current) { ref.current.playbackRate = value; }
          return;
        }
        li.style.display = (style.display === 'none') ? 'table-cell' : 'none';
      }
    });
  };

  return (
    <>
      <div>
        <SpeedIcon>Playback Speed</SpeedIcon>
      </div>
      <div>
        <ul style={ulElementStyle}>
          {values.map((value, index) => {
            return (<li
              ref={(liItemRef) => {
                const liArray = getRefArray();
                liArray[index] = liItemRef;
              }}
              style={(value != playbackRate) ? { 'display': 'none' } : {}}
              onClick={() => onClick(value)}
              data-value={value}
              key={index}
            >{value}</li>)
          })}
        </ul>
      </div >
    </>
  )
});

export default PlaybackRateDropdown;