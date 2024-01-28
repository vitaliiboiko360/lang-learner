import React from 'react';

import { useQuery } from 'react-query'
import HomeEntry from './home_entry';

import { makeUrlToResource } from './util.ts'

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
    <div className='page-text-flex'>
      <div className="container">
        <h1 className='title text-center'>Short Stories</h1>
      </div>
      <div className="page-text-content">
        <div className="container">
          <div className="home-texts-list">
            {articles}
          </div>
        </div>
      </div>
    </div>
  );
}