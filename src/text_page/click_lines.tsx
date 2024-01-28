import React from 'react';
import { Provider } from 'react-redux'

import TextParagraph from './text_paragraph.tsx'
import store from '../store/store.ts';
import css from './text_page.module.scss';

export default function ClickLines(props) {
  let lineArray = props.lines;
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
      />
    </React.Fragment>);
  });

  return (<>
    <Provider store={store}>
      <div className={css.center}>{textLines[0]}</div>
      <div>{textLines.slice(1)}</div>
    </Provider>
  </>);
}