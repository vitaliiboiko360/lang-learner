import React from 'react'

import SubStartEndTimeEditableField from './sub_start_end_time.tsx'

const StartEndTimeValidate = React.forwardRef((props, timePointsRef) => {
  const [start, setStart] = React.useState(props.start);
  const [end, setEnd] = React.useState(props.end);
  const [startValid, setStartValid] = React.useState(true);
  const [endValid, setEndValid] = React.useState(true);

  function collectValueForValidation(value, index, isStart: boolean) {
    if (!timePointsRef.current)
      return;
    if (isStart) {
      timePointsRef.current[index].start = value;
    } else {
      timePointsRef.current[index].end = value;
    }
  }

  function isValidValue(value, index, isStart: boolean) {
    if (!timePointsRef.current)
      return;

    // we check three conditions:
    /* 1) must not overflow totalTime */
    let isValid_0
      = value > props.totalTime;
    /* 2) must be correct with current index */
    let isValid_1
      = true;
    /* 3) must be correct with adjacent index */
    let isValid_2
      = true;

    if (isStart) {
      const nextEnd = timePointsRef.current[index].end;
      isValid_1 =
        nextEnd == 0 ||
        value < nextEnd;

      if (index > 0) {
        const previousEnd = timePointsRef.current[index - 1].end;
        isValid_2 =
          previousEnd == 0 ||
          value > previousEnd;
      }
    } else {
      const previousStart = timePointsRef.current[index].start;
      isValid_1 =
        previousStart == 0 ||
        value >= previousStart;

      if (index < timePointsRef.current.length) {
        const nextStart = timePointsRef.current[index + 1].start;
        isValid_2 =
          nextStart == 0 ||
          value <= nextStart;
      }
    }
    return isValid_0 && isValid_1 && isValid_2;
  }

  return (<>
    <SubStartEndTimeEditableField
      force={props.index == 0 ? true : false}
      classNameKey={'start'}
      value={start}
      valid={startValid}
      updateValue={(v) => {
        let value = parseFloat(v);
        setStart(value);
        collectValueForValidation(value, props.index, true);
        setStartValid(isValidValue(value, props.index, true));
        console.log(`start valid ${startValid}`);
        props.updateStart(value);
      }}
    />
    {
      props.children
    }
    <SubStartEndTimeEditableField
      classNameKey={'end'}
      value={end}
      valid={endValid}
      updateValue={(v) => {
        let value = parseFloat(v);
        setEnd(value);
        collectValueForValidation(value, props.index, false);
        setEndValid(isValidValue(value, props.index, false));
        console.log(`end valid ${endValid}`);
        props.updateEnd(value);
      }}
    />
  </>);
});

export default StartEndTimeValidate;