import React from 'react';

import Container from '@mui/material/Container';
import TextLines from './text_lines.tsx';
import AudioAndSlider from './audio_and_silider.tsx';
import BackHomeButton from './back_home_button.tsx';

import {
  useLoaderData,
} from "react-router-dom";
import PlaybackRateDropdown from './various_controls/playback_rate.tsx';

export default function AudioTextLines() {

  // let urlParams = useParams();
  // console.log(urlParams);

  const audioRef = React.useRef(null);
  const onTimeUpdateHandler = React.useRef(null);

  const updateStopTimeAudio = function (endTime) {

    if (onTimeUpdateHandler.current) {
      console.log('ref onTimeUpdateHandler is not null');
      audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler.current, false);
    }

    const onTimeUpdateHandlerNew = () => {
      if (audioRef.current.currentTime >= endTime) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler.current, false);
      }
    }

    audioRef.current.addEventListener("timeupdate", onTimeUpdateHandlerNew, false);
    onTimeUpdateHandler.current = onTimeUpdateHandlerNew;
  }

  const onClickUserPlayNewStart = function (seconds, end) {
    updateStopTimeAudio(end);
    audioRef.current.currentTime = seconds;
    audioRef.current.play();
  };

  const data = useLoaderData();

  return (
    <div className='container'>
      <BackHomeButton />
      <PlaybackRateDropdown ref={audioRef} />
      <div className='page-text-flex'>
        <div  className='page-text-content'>
          <TextLines onClick={onClickUserPlayNewStart} />
        </div>
        <AudioAndSlider ref={audioRef} audio={data.audio} />
      </div>
    </div>
  );
}