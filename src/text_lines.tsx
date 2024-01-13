import React from 'react';

import ClickLines from './click_lines.tsx';

import {
  useLoaderData,
} from "react-router-dom";

export default function TextLines(props) {
  const data = useLoaderData();

  return (
    <ClickLines
      onClick={props.onClick}
      lines={data.lines} />);
}