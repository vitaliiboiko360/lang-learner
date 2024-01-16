import React from 'react'
import { forwardRef } from 'react';

import SpeedIcon from '@mui/icons-material/Speed';

const PlaybackRateDropdown = forwardRef((props, ref) => {
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1.0);

  const handleChange = (value) => {
    setPlaybackSpeed(value);
    ref.current.playbackRate = value;
  };

  const liItems = React.useRef(null);

  function getMap() {
    if (!liItems.current) {
      // Initialize the Map on first usage.
      liItems.current = new Map();
    }
    return liItems.current;
  }

  const onClick = (value) => {
    console.log(value);

    liItems.current.forEach((li) => {
      if (li != null) {
        li.style.setAttribute('display', 'list-item');
      }
    });
  };

  const values = [1.0, 0.85, 0.7];
  const style = {
    'listStyle': 'none',
    'fontSize': '1.5em',
  }
  return (
    <>
      <div>
        <SpeedIcon>Playback Speed</SpeedIcon>
      </div>
      <div>
        <ul style={style}>
          {/* <li value={1.0}>1.0</li>
          <li value={0.85}>0.85</li>
          <li value={0.7}>0.7</li> */}
          {values.map((value, index) => {
            return (<li ref={liItems.current[index]} style={(value != playbackSpeed) ? { 'display': 'none' } : {}} onClick={() => onClick(value)} value={value} key={index}>{value}</li>)
          })}
        </ul>
      </div >
    </>
  )
});

export default PlaybackRateDropdown;