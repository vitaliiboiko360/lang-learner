import React from 'react';
import css from './svg_page.scss'

import {
  useLoaderData,
} from "react-router-dom";
import { fontSize } from '@mui/system';



export default function SvgPage(props) {

  const data = useLoaderData();

  let lines = data.lines;
  let str = lines[0].text + lines[1].text + lines[2].text;

  let texts = lines.map((line) => {
    return line.text;
  });

  let textHeader = texts[0];
  let textLines = texts.slice(1);

  let textElements = textLines.map((line, index) => {
    let yPos = `${(index + 2) * 2}em`;
    return (<text className='text' key={index + 1} y={yPos} > {line}</text >);
  });

  let height = `${lines.length + 1}em`;
  console.log(`height ${height}`);

  let parentWidth = React.useRef(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
  let parentHeight = React.useRef(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0));
  let pRef = React.useRef(null);

  React.useEffect(() => {
    const onResize = (e) => {
      //   parentWidth.current = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      //   parentHeight.current = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      parentWidth.current = Math.max(window.innerWidth || 0);
      parentHeight.current = Math.max(window.innerHeight || 0);
      // console.log(`parentWidth:${parentWidth.current}<br />parentHeight:${parentHeight.current}`);
      pRef.current.innerText = `parentWidth:${parentWidth.current}\nparentHeight:${parentHeight.current}`;
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg style={{
        border: 'blue 1px solid',
        width: '100%',
        height: '100%'
      }}
        width='80ch'
        height={height}
      >
        <style>
          .text {`
            font: '1.6em'
          `}
        </style>
        <text className='text' key={0} y='2em'>{textHeader}</text>
        {textElements}
      </svg>
      <p ref={pRef} >parentWidth:{parentWidth.current}<br />parentHeight:{parentHeight.current}</p>
    </div >
  );
}