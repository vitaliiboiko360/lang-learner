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
  const localClassName = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  const className = `sub ${localClassName}`;
  return (
    <input className={className} value={props.value} ></input>
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