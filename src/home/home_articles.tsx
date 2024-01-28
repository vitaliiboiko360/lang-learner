import React from 'react';
import { useMemo } from "react";
import css from './home.module.scss';
import HomeEntry from './home_entry';

function cutArr(arr, num = 3) {
    let res = [];
    res.push(arr.slice(0, num));
    for (let і = num; і < arr.length; і += (num-1)) {
        res.push(arr.slice(і, і + (num-1)));
    }
    return res;
}
const HomeArticles = ({data}) => {
    const array = useMemo(() => {
        return cutArr(data.texts);
    }, [data]);
    return <>
    {
        array.map((row, i) => {
            return <div className={css.row} key={`row_${i}`}>
                {
                    row.map((element, index) => {
                        return <HomeEntry 
                        num={index}
                        element={element}
                        key={`row_${i}_item_${index}`}/>
                    })
                }
            </div>
        })
    }</>
};
export default HomeArticles;