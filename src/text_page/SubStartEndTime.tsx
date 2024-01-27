import { TrendingUpTwoTone } from '@mui/icons-material';
import React from 'react'
import { forwardRef } from 'react';

const SubStartEndTime = forwardRef((props, ref) => {
  const localClassName = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  const className = `sub ${localClassName}`;
  return (
    <sub ref={ref} className={className}>{props.value}</sub>
  );
});

const SubStartEndTimeInputField = forwardRef((props, ref) => {
  const className = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  const [value, setValue] = React.useState(props.value);
  console.log(`we recived props.totalTime ${props.totalTime}`);
  return (
    <input
      ref={ref}
      className={className}
      type='number'
      maxLength={5} minLength={1}
      inputMode='numeric'
      min={0}
      max={props.totalTime}
      value={value}
      onChange={(e) => { setValue(e.target.value) }}
      step={0.01}
      onBlur={(e) => {
        props.updateValue(value);
      }}
    // pattern='[0-9]{1,2}\.[0-9]{1,2}'
    // required
    ></input >
  );
});

export function SubStartEndTimeEditableField(props) {

  const subRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const [activeEditMode, setActiveEditMode] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

  const eventTarget = new EventTarget();

  function handleEvent(event) {
    console.log(event.type);
  }

  // React.useEffect(() => {
  //   const onFocusOut = (event) => {
  //     setActiveEditMode(false);
  //   };
  //   if (inputRef.current) {
  //     inputRef.current.addEventListener("focusout", onFocusOut);
  //     console.log(`we catch FOCUSOUT event`);
  //   }
  //   return () => {
  //     if (inputRef.current) {
  //       inputRef.current.removeEventListener("focusout", onFocusOut);
  //     }
  //   }
  // }, []);

  React.useEffect(() => {
    const onClick = (event) => {
      setActiveEditMode(true);
    };

    if (subRef.current) {
      subRef.current.addEventListener("click", onClick);
    }
    return () => {
      if (subRef.current) {
        subRef.current.removeEventListener("click", onClick);
      }
    }
  }, []);

  return (
    activeEditMode ?
      <SubStartEndTimeInputField
        ref={inputRef}
        force={props.force}
        className={props.className}
        value={value}
        totalTime={props.totalTime}
        updateValue={(value) => {
          setValue(value);
          setActiveEditMode(false);
        }}
      /> :
      <SubStartEndTime
        ref={subRef}
        force={props.force}
        className={props.className}
        value={value}
      />
  );
}

export default SubStartEndTime;