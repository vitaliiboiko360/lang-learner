import React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { selectActiveIndex, setActiveIndexAction } from '../store/activeIndexSlice.ts';
import StartEndTime_ValidateAndDisplay from './start_end_time/start_end_time_validate_and_display.tsx'
import ConditionalLineBreak from './conditional_line_break.tsx'
import css from './text_page.module.scss'


let styleWithLine = {
  background: 'linear-gradient(to right, rgba(100, 200, 200, 1), rgba(100, 200, 200, 1)),linear-gradient(to right, rgba(255, 0, 0, 1), rgba(255, 0, 180, 1), rgba(0, 100, 200, 1))',
  backgroundSize: '100% 0.1em, 0 0.1em',
  backgroundPosition: '100% 100%, 0 100%',
  backgroundRepeat: 'no-repeat',
  transition: 'background-size 1400ms',
  display: 'inline'
};

let styleOutOfLine = {
  backgroundSize: '0 0.1em, 100% 0.1em'
};

const TextAnimeLine = React.forwardRef((props, timePointsRef) => {
  const [start, setStart] = React.useState(props.start);
  const [end, setEnd] = React.useState(props.end);

  const spanRef = React.useRef(null);

  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActiveIndex);

  const lenghtOfTheAnimation = Math.floor((end - start) * 1000);

  const onTransitionEnd = (event) => {
    spanRef.current.style.backgroundSize = '0% 1em, 0% 0.2em';
    spanRef.current.style.transition = '';
    console.log('ended transtion');
  };

  function onClick() {
    dispatch(setActiveIndexAction(props.index));

    spanRef.current.addEventListener("transitionend", onTransitionEnd);
    if (props.index == selector) {
      spanRef.current.style.transition = 'none !important';
    }

    spanRef.current.style.backgroundSize = `0% 1em, 100% 0.2em`;
    spanRef.current.style.transition = `background-size ${lenghtOfTheAnimation}ms`;
    props.onClick(start, end);
  }

  React.useEffect(() => {
    if (selector == props.index) {
      return;
    }
    // clear text underline
  });

  const wordsArray = props.text.split(' ');
  const wordsInSpans = wordsArray.map((w, index) => {
    return <span key={index + 1}>{w + ' '}</span>;
  });

  return (<>
    <div key={props.index} style={{ display: 'inline' }}>
      <StartEndTime_ValidateAndDisplay
        index={props.index}
        ref={timePointsRef}
        start={props.start}
        end={props.end}
        totalTime={props.totalTime}
        updateStart={setStart}
        updateEnd={setEnd}
      >
        {
          props.index === 0
            ? <h2 className={css.title}>
              <span ref={spanRef} className={css.textAnimeLine} ref={spanRef} onClick={onClick}>{wordsInSpans}</span>
            </h2>
            : <span ref={spanRef} className={css.textAnimeLine} onClick={onClick}>{wordsInSpans}</span>
        }
      </StartEndTime_ValidateAndDisplay>
      <ConditionalLineBreak endParagraph={props.endParagraph} />
    </div>
  </>);
});

export default TextAnimeLine;