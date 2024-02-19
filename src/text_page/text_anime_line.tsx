import React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { selectActiveIndex, setActiveIndexAction } from '../store/activeIndexSlice.ts';
import StartEndTime_ValidateAndDisplay from './start_end_time/start_end_time_validate_and_display.tsx'
import ConditionalLineBreak from './conditional_line_break.tsx'
import css from './text_page.module.scss'

const TextParagraph = React.forwardRef((props, timePointsRef) => {
  const [start, setStart] = React.useState(props.start);
  const [end, setEnd] = React.useState(props.end);

  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActiveIndex);

  function onClick() {
    dispatch(setActiveIndexAction(props.index));
    if (props.index == selector) {
      // cleanup active animation
    }
    const lenghtOfTheAnimation = end - start;

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
      <svg ref={svgRef} style={{ position: 'absolute', zIndex: '-1' }}></svg>
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
            ? <h2 className={css.title} onClick={onClick}>
              {wordsInSpans}
            </h2>
            : <span className={css.textLine} onClick={onClick}>
              {wordsInSpans}
            </span>
        }
      </StartEndTime_ValidateAndDisplay>
      <ConditionalLineBreak endParagraph={props.endParagraph} />
    </div>
  </>);
});

export default TextParagraph;