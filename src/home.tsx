import React from 'react';

import { useQuery } from 'react-query'
import HomeEntry from './home_entry';

import { makeUrlToResource } from './util.ts'

export default function Home() {
  //var host = document.location.host;
  const { isLoading, error, data } = useQuery('homeData', () =>
    fetch(`http://${host}/data/list_of_texts.json`).then(res =>
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
    <>
      <div className="home-title">
        <div className='home-center'><h3>Short Stories</h3>
        </div>
      </div>
      <div className="centered">
        <div className="home-container">
          <div className="home-entries">
            {articles}
          </div>
        </div>
      </div>
    </>
  );
}