import React from 'react';

import { useQuery } from 'react-query'
import HomeEntry from './home_entry';

import { makeUrlToResource } from '../etc/util.ts';
import css from './home.module.scss';

export default function Home() {
  //var host = document.location.host;
  const { isLoading, error, data } = useQuery('homeData', () =>
    fetch(`data/list_of_texts.json`).then(res =>
      res.json()
    )
  );
  if (isLoading) return 'Loading...';
  if (error) return 'Error getting list of texts: ' + error.message;

  const articles = data.texts.map((element, index) => {
    const url = makeUrlToResource(element.resource);
    return (<React.Fragment key={index}>
      <HomeEntry
        title={element.title}
        href={url}
        artwork={element.artwork} />
    </React.Fragment>)
  });

  return (
    <div className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Short Stories</h1>
      </div>
      <div className={css.content}>
        <div className={css.container}>
          <div className={css.list}>
            {articles}
          </div>
        </div>
      </div>
    </div>
  );
}