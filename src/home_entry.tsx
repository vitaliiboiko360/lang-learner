import React from 'react';

import { makeUrlToArtwork } from './util.ts'

export default function HomeEntry(props) {
  return (<>
    <div>
      <div className='artwork'>
        <img src={makeUrlToArtwork(props.artwork)} />
      </div>
      <a href={props.href} >{props.title}</a>
    </div>
  </>);
}