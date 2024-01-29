import React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { selectActiveIndex, setActiveIndexAction } from '../store/activeIndexSlice.ts';
import SubStartEndTimeEditableField from './sub_start_end_time.tsx'
import ConditionalLineBreak from './conditional_line_break.tsx'
import { cleanupSvgChildren, setupAnimation } from './anime/line_animation.ts';
import css from './text_page.module.scss'

export default function TextParagraph(props) {
  const [start, setStart] = React.useState(props.start);
  const [end, setEnd] = React.useState(props.end);

  const spanRef = React.useRef<HTMLSpanElement>(null);
  const svgRef = React.useRef<HTMLOrSVGElement>(null);

  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActiveIndex);

  function onClick() {
    dispatch(setActiveIndexAction(props.index));
    if (props.index == selector) {
      cleanupSvgChildren(svgRef); // cleanup active animation
    }
    const lenghtOfTheAnimation = end - start;
    setupAnimation(lenghtOfTheAnimation, spanRef, svgRef);
    props.onClick(start, end);
  }

  React.useEffect(() => {
    const { width, height, top, left } = spanRef.current.getBoundingClientRect();
    const svgElement = svgRef.current as SVGElement;
    svgElement.style.width = `${Math.ceil(width) + 10}px`;
    svgElement.style.height = `${Math.ceil(height) + 1}px`;
    svgElement.style.top = Math.ceil(top) + 'px';
    svgElement.style.left = Math.ceil(left) + 'px';
  }, []);

  React.useEffect(() => {
    if (selector == props.index) {
      return;
    }
    if (svgRef.current.childNodes.length != 0) {
      cleanupSvgChildren(svgRef);
    }
  });

  const wordsArray = props.text.split(' ');
  const wordsInSpans = wordsArray.map((w, index) => {
    return <span key={index + 1}>{w + ' '}</span>;
  });

  return (<>
    <div key={props.index} style={{ display: 'inline' }}>
      <svg ref={svgRef} style={{ position: 'absolute', zIndex: '-1' }}></svg>
      <SubStartEndTimeEditableField
        force={props.index == 0 ? true : false}
        classNameKey={'start'}
        value={start}
        totalTime={props.totalTime}
        updateValue={setStart}
      />
      {
        props.index === 0
          ? <h2
            ref={spanRef}
            className={css.title}
            onClick={onClick}
          >
            {wordsInSpans}</h2>
          : <span
            ref={spanRef}
            className={css.textLine}
            onClick={onClick}
          >
            {wordsInSpans}</span>
      }
      <SubStartEndTimeEditableField
        classNameKey={'end'}
        value={end}
        totalTime={props.totalTime}
        updateValue={setEnd}
      />
      <ConditionalLineBreak endParagraph={props.endParagraph} />
    </div >
  </>);
}