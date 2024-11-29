import React from 'react';

import css from './audio.module.scss';
import { toFixed } from '../etc/util.ts';

const AudioAndSlider = React.forwardRef((props, audioRef) => {
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  // React.useEffect(() => {
  //   const onLoadedMetadata = () => {
  //     // const totalTime = toFixed(audioRef.current.duration, 2);
  //     console.log(`audioRef.current.duration ${audioRef.current?.duration}`);
  //   }

  //   audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata, false);

  //   return () => {
  //     if (!audioRef.current)
  //       return;
  //     audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata, false);
  //   };
  // }, []);

  // React.useEffect(() => {

  //   const onTimeUpdateHandler = () => {
  //     if (!audioRef.current) {
  //       return;
  //     }
  //     const currentTime = audioRef.current.currentTime;
  //     setCurrentTime(toFixed(currentTime, 2));
  //   }

  //   audioRef.current.addEventListener("timeupdate", onTimeUpdateHandler, false);

  //   return () => {
  //     if (!audioRef.current)
  //       return;
  //     audioRef.current.removeEventListener("timeupdate", onTimeUpdateHandler, false);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (totalTime > 0) {
  //     props.updateTotalTime(totalTime);
  //   }
  // });

  const lineRef = React.useRef();

  React.useEffect(() => {
    lineRef.current.style.color = document.body.style.background;
  });

  return (
    <>
      <div className={css.bottomLineOuterDiv}>
        <span ref={lineRef} className={css.bottomLine}>
          <span></span>
        </span>
        {/* <div style={{ display: 'none' }}>
        <Audio ref={audioRef} audio={props.audio} />
        <PlayPauseButton
          ref={audioRef}
        />
        <SliderAudioPlayseek
          ref={audioRef}
          currentTime={currentTime}
          totalTime={totalTime}
        />
      </div> */}
      </div>
    </>
  );
});

export default AudioAndSlider;
