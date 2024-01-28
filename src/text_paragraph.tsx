import React from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks.ts'
import { selectActiveIndex, setActiveIndexAction } from './store/activeIndexSlice.ts';
import SubStartEndTime, { SubStartEndTimeEditableField } from './text_page/SubStartEndTime.tsx'
import ConditionalLineBreak from './text_page/ConditionalLineBreak.tsx'

// attributes needs to be in format {'attr':'val','attr2':'val2',...}
function addSVGElemenReturnAnime(elementType: string, target: HTMLElement | SVGElement, attributes: Record<string, unknown> = {}, duration, to, animationId, beginAnimation) {
  const schema = 'http://www.w3.org/2000/svg';
  const element: SVGElement = document.createElementNS(schema, elementType);
  Object.entries(attributes).map(a => element.setAttribute(a[0], a[1] as string));
  let dur = '3s'
  if (duration) {
    dur = duration
  }

  const animation = document.createElementNS(schema, "animate");
  animation.setAttribute('id', animationId);
  animation.setAttribute('attributeName', 'width');
  animation.setAttribute('from', 0);
  animation.setAttribute('to', to);
  animation.setAttribute('begin', 'indefinite');
  animation.setAttribute('dur', dur);
  animation.setAttribute('repeatCount', '1');

  element.appendChild(animation);
  target.appendChild(element);

  return animation;
};

export default function TextParagraph(props) {
  const spanRef = React.useRef(null);
  const svgRef = React.useRef(null);

  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActiveIndex);

  function cleanupSvgChildren(svgRef) {
    if (svgRef.current == null)
      return;
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.lastChild);
    }
  }

  function setAnimation(length) {
    const parentRect = spanRef.current.getBoundingClientRect();
    const children = [].slice.call(spanRef.current.childNodes);
    // console.log(`\n${JSON.stringify(parentRect)}`);

    const coordinates = children.reduce((collectedArray, child) => {

      const childRect = child.getBoundingClientRect();
      const coordinateValues = { 'x': (childRect.x - parentRect.x), 'y': childRect.height * (collectedArray.length + 1), 'deltaX': childRect.width, 'lineBottomY': childRect.bottom };
      // console.log(`word=${child.innerText}\t${JSON.stringify(childRect)}`);

      const foundIndex = collectedArray.findIndex((element) => {
        return element.lineBottomY === coordinateValues.lineBottomY;
      });

      if (foundIndex == -1) {
        collectedArray.push(coordinateValues);
      }
      else {
        collectedArray[foundIndex].deltaX = collectedArray[foundIndex].deltaX + childRect.width;
      }

      return collectedArray;
    }, []);


    const lineLength = coordinates.reduce((width, values) => {
      width += values.deltaX;
      return width;
    }, 0);

    const animationElements = coordinates.map((values) => {
      let portionOfLength = lineLength / values.deltaX;
      let durationOfAnimation = Math.ceil(length / portionOfLength);
      return addSVGElemenReturnAnime('rect', svgRef.current, {
        'x': values.x, 'y': values.y, 'stroke-width': '1', 'stroke': 'var(--blue)', 'width': '0', 'height': '1px', 'rx': '1px', 'ry': '1px'
      }, `${durationOfAnimation}s`, values.deltaX);
    });

    const runAnimation = function (index) {
      animationElements[index].addEventListener("endEvent", () => {
        if (animationElements.length > (index + 1)) {
          animationElements[index].parentNode.setAttribute('width', animationElements[index].getAttribute('to'));
          runAnimation(index + 1);
        }
        else {
          animationElements.forEach((element) => { element.parentNode.remove() });
        }
      });
      animationElements[index].beginElement();
    }
    runAnimation(0);
  }

  function onClick() {
    dispatch(setActiveIndexAction(props.index));
    if (props.index == selector) {
      cleanupSvgChildren(svgRef); // cleanup active animation
    }
    setAnimation(props.length);
    props.onClick();
  }

  React.useEffect(() => {
    const { width, height, top, left } = spanRef.current.getBoundingClientRect();
    svgRef.current.style.width = `${Math.ceil(width) + 10}px`;
    svgRef.current.style.height = `${Math.ceil(height) + 1}px`;
    svgRef.current.style.top = Math.ceil(top) + 'px';
    svgRef.current.style.left = Math.ceil(left) + 'px';
  }, []);

  React.useEffect(() => {
    if (selector == props.index) {
      console.log(`ACTIVE COMP paragraph index=${props.index}`);
      return;
    }
    if (svgRef.current.childNodes.length != 0) {
      console.log(`we found childs in props.index=${props.index} element cleanup`);
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
        className="start"
        value={props.start}
      />
      {
        props.index === 0 
        ? <h2 ref={spanRef} className={ 'title'} onClick={onClick}>{wordsInSpans}</h2> 
        : <span ref={spanRef} onClick={onClick}>{wordsInSpans}</span>
      }
      <SubStartEndTimeEditableField
        className="end"
        value={props.end}
        totalTime={props.totalTime}
      />
      <ConditionalLineBreak endParagraph={props.endParagraph} />
    </div >
  </>);
}