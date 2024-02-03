import React from 'react'
import clsx from 'clsx';
import css from '../text_page.module.scss';

const getClassName = function (props) {
  const localClassName =
    (props.value == 0 && props.force != true) ?
      css.unassigned :
      (props.valid ? css[props.classNameKey] : css.invalid);
  return clsx(css.sub, localClassName);
}

const SubStartEndTime = function (props) {
  const className = getClassName(props);
  return (
    <sub
      className={className}
      onClick={props.onClick}
    >{props.value}</sub>
  );
};

const SubStartEndTimeInputField = function (props) {
  const className = getClassName(props);
  const [value, setValue] = React.useState(props.value);
  return (
    <input
      className={className}
      type='number'
      inputMode='numeric'
      autoFocus
      min={0}
      max={props.totalTime}
      value={value}
      onChange={(e) => { setValue(e.target.value) }}
      step={0.01}
      onBlur={(e) => {
        props.updateValue(value);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          props.updateValue(value);
        }
      }}
      pattern='[0-9]{1,3}\.[0-9]{1,2}'
      required
    ></input >
  );
}

export default function SubStartEndTimeEditableField(props) {
  const [activeEditMode, setActiveEditMode] = React.useState(false);
  return (
    activeEditMode ?
      <SubStartEndTimeInputField
        force={props.force}
        classNameKey={props.classNameKey}
        totalTime={props.totalTime}
        value={props.value}
        valid={props.valid}
        updateValue={(value) => {
          props.updateValue(value);
          setActiveEditMode(false);
        }}
      /> :
      <SubStartEndTime
        force={props.force}
        classNameKey={props.classNameKey}
        value={props.value}
        valid={props.valid}
        onClick={() => {
          setActiveEditMode(true);
        }}
      />
  );
}