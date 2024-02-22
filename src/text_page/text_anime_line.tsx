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

  // React.useEffect(() => {
  //   if (selector == props.index) {
  //     return;
  //   }
  // });



  React.useEffect(() => {
    if (props.index != 4)
      return;
    if (spanRef.current == null) {
      return;
    }

    let children = spanRef.current.children;
    for (let i = 0; i < children.length; i++) {
      let element = children[i].children[0];
      if (element.tagName != 'SPAN') {
        // console.log(`${JSON.stringify(children[i].children[1].getBoundingClientRect())}`);
        continue;
      }

      console.log(`element.innerText ${element.innerText} ${JSON.stringify(element.getBoundingClientRect())}`);


      const { width, left, bottom } = element.getBoundingClientRect();
      let nextSvg = children[i].children[1];

      while (nextSvg.firstChild) {
        nextSvg.removeChild(nextSvg.lastChild);
      }

      const schema = 'http://www.w3.org/2000/svg';
      const line = document.createElementNS(schema, "path");
      line.setAttribute('d', `M0 1 L${Math.ceil(width)} 1`);
      // line.setAttribute('x', '0');
      // line.setAttribute('y', '1');
      // line.setAttribute('x2', `${Math.ceil(width)}`);
      // line.setAttribute('y2', '1');
      line.setAttribute('stroke', 'blue');
      line.setAttribute('stroke-width', '0.21em');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('stroke-linejoin', 'round');
      nextSvg.appendChild(line);


      let oldRect = nextSvg.getBoundingClientRect();
      // nextSvg.style.left = left;
      // nextSvg.style.top = bottom;
      nextSvg.setAttribute("width", Math.ceil(width));
      console.log(`------${JSON.stringify(oldRect)}\n${JSON.stringify(nextSvg.getBoundingClientRect())}\n-----`);
    }
  });

  const wordsArray = props.text.split(' ');
  let wordsInSpans = wordsArray.map((word, index) => {
    let leadingSpace = index > 0 ? ' ' : '';
    return (
      <>
        <span key={index} className={css.wordStack}>
          <span key={index + wordsArray.length}>{leadingSpace + word}</span>
          <svg key={index + wordsArray.length * 2} height='2px' width='0' style={{ display: 'inline', zIndex: '-1' }}></svg>
        </span>
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
        key={props.index}
      >

        <span key={props.index} /*style={{ position: 'relative' }}*/ ref={spanRef} onClick={onClick}>{wordsInSpans}</span>

      </StartEndTime_ValidateAndDisplay>
      <ConditionalLineBreak endParagraph={props.endParagraph} />
    </div >
  </>);
});

export default TextAnimeLine;