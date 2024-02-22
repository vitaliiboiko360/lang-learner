import React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { selectActiveIndex, setActiveIndexAction } from '../store/activeIndexSlice.ts';
import StartEndTime_ValidateAndDisplay from './start_end_time/start_end_time_validate_and_display.tsx'
import ConditionalLineBreak from './conditional_line_break.tsx'
import css from './text_page.module.scss'


const TextAnimeLine = React.forwardRef((props, timePointsRef) => {
  const [start, setStart] = React.useState(props.start);
  const [end, setEnd] = React.useState(props.end);

  const spanRef = React.useRef(null);

  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActiveIndex);

  function onClick() {
    dispatch(setActiveIndexAction(props.index));
    if (props.index == selector) {
    }
    props.onClick(start, end);
  }

  React.useEffect(() => {
    if (selector == props.index) {
      return;
    }
  });

  React.useEffect(() => {
    if (props.index != 1)
      return;
    if (!spanRef.current) {
      return;
    }
    let children = spanRef.current.children;
    for (let i = 0; i < children.length; i++) {
      let element = children[i];
      if (element.tagName != 'SPAN') {
        // console.log(`${JSON.stringify(children[i].children[1].getBoundingClientRect())}`);
        continue;
      }


      console.log(`element.innerText ${element.innerText} ${JSON.stringify(element.getBoundingClientRect())}`);


      const { width, height } = element.getBoundingClientRect();
      let nextSvg = children[i + 1];

      const schema = 'http://www.w3.org/2000/svg';
      const path = document.createElementNS(schema, "path");
      path.setAttribute('d', `M0 1 l${width} 1`);
      path.setAttribute('stroke', 'blue');
      nextSvg.appendChild(path);


      let oldRect = nextSvg.getBoundingClientRect();
      nextSvg.style.left = 0;
      nextSvg.style.top = height;
      nextSvg.setAttribute("width", width);
      console.log(`------${JSON.stringify(oldRect)}\n${JSON.stringify(nextSvg.getBoundingClientRect())}\n-----`);
    }
  });

  const wordsArray = props.text.split(' ');
  let wordsInSpans = wordsArray.map((word, index) => {
    let leadingSpace = index > 0 ? ' ' : '';
    return (
      <>
        <span key={index + 1}>{leadingSpace + word}</span>
        <svg key={index + wordsArray.length + 1} height='2px' width='0' style={{ position: 'absolute', zIndex: '-1' }}></svg>
      </>
    );
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
          <span key={0} style={{ position: 'relative' }} ref={spanRef} onClick={onClick}>{wordsInSpans}</span>
        }
      </StartEndTime_ValidateAndDisplay>
      <ConditionalLineBreak endParagraph={props.endParagraph} />
    </div >
  </>);
});

export default TextAnimeLine;