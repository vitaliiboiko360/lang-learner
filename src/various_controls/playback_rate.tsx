import React from 'react'
import { forwardRef } from 'react';

import SpeedIcon from '@mui/icons-material/Speed';

const valuesArrayLength = 3;

const PlaybackRateDropdown = forwardRef((props, ref) => {
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1.0);

  const handleChange = (value) => {
    setPlaybackSpeed(value);
    ref.current.playbackRate = value;
  };

  const liItems = React.useRef(null);

  function getRefArray() {
    if (!liItems.current) {
      liItems.current = new Array();
    }
    return liItems.current;
  }

  const onClick = (value) => {
    // console.log(value);
    // console.log(liItems);
    liItems.current.forEach((li) => {
      if (li != null) {
        var style = window.getComputedStyle(li);
        //console.log(style['display']);
        if (li.value === value) {
          li.style['display'] = 'list-item';
          console.log(`activated ${value} value`);
          console.log(li.style['display']);
          return;
        }

        li.style['display'] = (style['display'] === 'none') ? 'list-item' : 'none';

        // console.log(parseFloat(li.value).toFixed(2));
        // Object.keys(li).forEach(function (key) {
        //   var val = li[key];
        //   console.log(val);
        // });
        // if (style.getAttribute('display') === 'none') {
        //   console.log(li);
        // }
        // li.style.setAttribute('display', 'list-item');
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
            return (<li ref={(liItemRef) => {
              const liArray = getRefArray();
              liArray[index] = liItemRef;
            }} style={(value != playbackSpeed) ? { 'display': 'none' } : {}} onClick={() => onClick(value)} value={value} key={index}>{value}</li>)
          })}
        </ul>
      </div >
    </>
  )
});

export default PlaybackRateDropdown;