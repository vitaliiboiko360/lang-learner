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

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

    function populate(a) {
      for (var i = 0; i < 6; i++) {
        var x = Math.round(Math.random() * 14);
        var y = hexValues[x];
        a += y;
      }
      return a;
    }

    var newColor1 = populate('#');
    var newColor2 = populate('#');
    var angle = Math.round(Math.random() * 360);

    var gradient = `linear-gradient(${angle}deg, ${newColor1}80, ${newColor2}80)`;
    document.body.style.background = gradient;
    return () => {
      document.body.style.background = '';
    }
  });

  return (
    <div className={css.container}>
      <BackHomeButton />
      <PlaybackRateDropdown ref={audioRef} />
      <ButtonSubmit_AudioTextSyncTime
        ref={refArrayAudioTimeTextSync} />
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