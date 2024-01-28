import React from 'react';

import TextLines from '../text_page/text_lines.tsx';
import AudioAndSlider from './audio_and_silider.tsx';
import BackHomeButton from '../various_controls/back_home_button.tsx';

import {
  useLoaderData,
} from "react-router-dom";
import PlaybackRateDropdown from '../various_controls/playback_rate.tsx';

export default function AudioTextLines() {

  // let urlParams = useParams();
  // console.log(urlParams);

  const audioRef = React.useRef(null);
  const onTimeUpdateHandler = React.useRef(null);
  const [totalTime, setTotalTime] = React.useState(0);

  const updateStopTimeAudio = function (endTime) {

    if (onTimeUpdateHandler.current) {
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
          <TextLines
          onClick={onClickUserPlayNewStart}
          totalTime={totalTime}
        />
        </div>
        <AudioAndSlider
          ref={audioRef}
          audio={data.audio}
          updateTotalTime={setTotalTime}
        />
      </div>
    </div>
  );
}