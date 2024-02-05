import React from 'react';
import { Provider } from 'react-redux'

import TextParagraph from './text_paragraph.tsx'
import store from '../store/store.ts';
import css from './text_page.module.scss';

const ClickLines = React.forwardRef((props, refArrayAudioTimeTextSync) => {
  let lineArray = props.lines;

  let timePoints = lineArray.map((textEntry) => {
    return { start: textEntry.start, end: textEntry.end }
  });

  let textLines = lineArray.map((textEntry, index) => {
    return (<React.Fragment key={index}>
      <TextParagraph
        onClick={props.onClick}
        text={textEntry.text}
        index={index}
        endParagraph={textEntry.endParagraph}
        start={textEntry.start}
        end={textEntry.end}
        totalTime={props.totalTime}
        timePoints={timePoints}
        ref={refArrayAudioTimeTextSync}
      />
    </React.Fragment>);
  });

  return (<>
    <Provider store={store}>
      <div className={css.center}>{textLines[0]}</div>
      <div>{textLines.slice(1)}</div>
    </Provider>
  </>);
});

export default ClickLines;