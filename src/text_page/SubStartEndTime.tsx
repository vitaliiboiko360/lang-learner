import React from 'react'

const getClassName = function (props: {value, force, className}) {
  const localClassName = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  return `sub ${localClassName}`;
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
      onKeyDown={(event)=>{
        if(event.key === 'Enter'){
          props.updateValue(value);
        }
      }}
      pattern='[0-9]{1,3}\.[0-9]{1,2}'
      required
    ></input >
  );
}

export function SubStartEndTimeEditableField(props) {
  const [activeEditMode, setActiveEditMode] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

  const onClick = (event) => {
    setActiveEditMode(true);
  };

  return (
    activeEditMode ?
      <SubStartEndTimeInputField
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
        force={props.force}
        className={props.className}
        onClick={onClick}
        value={value}
      />
  );
}

export default SubStartEndTime;