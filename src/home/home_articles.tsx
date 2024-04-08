import React, { useEffect, useRef, useState } from 'react';
import { useMemo } from "react";
import css from './home.module.scss';
import HomeEntry from './home_entry';

const HomeArticles = ({ data }) => {
  const array = useMemo(() => {
    return data.texts;
  }, [data]);
 
  return <div className={css.row}>
    {
      array.map((element, index) => {
        return <HomeEntry
          element={element}
          key={`item_${index}`} />
      })
    }
  </div>
};
export default HomeArticles;