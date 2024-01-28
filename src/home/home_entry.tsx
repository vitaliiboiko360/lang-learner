import React from 'react';

import css from './home.module.scss';
import { makeUrlToArtwork, makeUrlToResource } from '../etc/util.ts'
import { Link } from 'react-router-dom';

export default function HomeEntry({element, num}) {
  const href = makeUrlToResource(element.resource);
  const {title,artwork } = element;
  const row = Math.ceil(num / 3);
  return (<div className={css.item}>
    <Link to={href} className={css.link}>
      <div className={css.linkContent}>
        <span className={css.image}>
          <img src={makeUrlToArtwork(artwork)} />
        </span>
        <svg
          className={css.svgShape}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
          fill={'none'}
            id={`${num}circlePath`}
            d="
              M 10, 50
              a 40,40 0 1,1 80,0
              40,40 0 1,1 -80,0
            "
          />
          <text fontSize={'0.55rem'}>
            <textPath href={`#${num}circlePath`}>
              {title}
            </textPath>
          </text>
        </svg>
      </div>
    </Link>
  </div>);
}