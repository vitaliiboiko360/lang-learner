import React from 'react'
import { forwardRef } from 'react';

const SubStartEndTime = forwardRef((props, ref) => {
  const localClassName = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  const className = `sub ${localClassName}`;
  return (
    <sub ref={ref} className={className} contentEditable suppressContentEditableWarning={true}>{props.value}</sub>
  );
});

const SubStartEndTimeInputField = forwardRef((props, ref) => {
  const className = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  const [value, setValue] = React.useState(props.value);
  console.log(`we recived props.totalTime ${props.totalTime}`);
  return (
    <input
      className={className}
      type='number'
      maxLength={5} minLength={1}
      inputMode='numeric'
      min={0}
      max={props.totalTime}
      value={value}
      onChange={(e) => { setValue(e.target.value) }}
      step={0.01}
    // pattern='[0-9]{1,2}\.[0-9]{1,2}'
    // required
    ></input >
  );
});

export function SubStartEndTimeEditableField(props) {

  const subRef = React.useRef(null);
  const [activeEditMode, setActiveEditMode] = React.useState(false);

  React.useEffect(() => {
    subRef.current.addEventListener("click", (event) => {
      setActiveEditMode(!activeEditMode);
    });
  }, []);

  return (
    activeEditMode ? <SubStartEndTimeInputField {...props} /> : <SubStartEndTime ref={subRef} {...props} />
  );
}

export default SubStartEndTime;