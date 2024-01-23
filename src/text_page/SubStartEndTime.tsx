import React from 'react'

export default function SubStartEndTime(props) {
  const localClassName = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  const className = `sub ${localClassName}`;
  return (
    <sub className={className}>{props.value}</sub>
  );
}