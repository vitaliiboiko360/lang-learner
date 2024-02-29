import React from 'react';

import TextLines from '../text_page/text_lines.tsx';
import AudioAndSlider from './audio_and_silider.tsx';
import BackHomeButton from '../various_controls/back_home_button.tsx';
import ButtonSubmit_AudioTextSyncTime from '../various_controls/button_submit_audio_text_sync_time.tsx'

import {
  useLoaderData,
} from "react-router-dom";
import PlaybackRateDropdown from '../various_controls/playback_rate.tsx';
import css from './audio.module.scss';

export default function AudioTextLines() {

  const audioRef = React.useRef(null);
  const onTimeUpdateHandler = React.useRef(null);
  const refArrayAudioTimeTextSync = React.useRef(null);
  const [totalTime, setTotalTime] = React.useState(0);

  const updateStopTimeAudio = function (endTime) {

    if (onTimeUpdateHandler.current) {
      audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler.current, false);
    }

    const onTimeUpdateHandlerNew = () => {
      if (audioRef.current.currentTime >= parseFloat(endTime)) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler.current, false);
      }
    }

    audioRef.current.addEventListener("timeupdate", onTimeUpdateHandlerNew, false);
    onTimeUpdateHandler.current = onTimeUpdateHandlerNew;
  }

  const onClickUserPlayNewStart = function (seconds, end) {
    audioRef.current.currentTime = parseFloat(seconds);
    updateStopTimeAudio(end);
    audioRef.current.play();
  };

  const data = useLoaderData();

  React.useEffect(() => {
    let newColor1 = `#${Math.round(Math.random() * 10000000).toString(16).substring(0, 6)}`;
    let newColor2 = `#${Math.round(Math.random() * 10000000).toString(16).substring(0, 6)}`;
    let angle = Math.round(Math.random() * 360);

    let gradient = `linear-gradient(${angle}deg, ${newColor1}40, ${newColor2}40)`;
    console.log(gradient);
    document.body.style.background = gradient;
    return () => {
      document.body.style.background = '';
    }
  });

  return (
    <div className={css.container}>

      <BackHomeButton />
      {/* <ButtonSubmit_AudioTextSyncTime
        ref={refArrayAudioTimeTextSync} /> */}
      <PlaybackRateDropdown ref={audioRef} />


      <div className={css.page}>
        <div className={css.content}>
          <TextLines
            onClick={onClickUserPlayNewStart}
            totalTime={totalTime}
            ref={refArrayAudioTimeTextSync}
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