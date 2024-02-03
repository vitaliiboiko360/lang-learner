import React from 'react'

import StartEndTime_SubEditableField from './start_end_time_sub_input.tsx'

const StartEndTime_ValidateAndDisplay = React.forwardRef((props, timePointsRef) => {
  const [start, setStart] = React.useState({ value: props.start, valid: true });
  const [end, setEnd] = React.useState({ value: props.end, valid: true });

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
      = value < props.totalTime;
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

      if ((index + 1) < timePointsRef.current.length) {
        const nextStart = timePointsRef.current[index + 1].start;
        isValid_2 =
          nextStart == 0 ||
          value <= nextStart;
      }
    }
    if (isValid_0 && isValid_1 && isValid_2) {
      return true;
    }
    return false;
  }
  return (<>
    <StartEndTime_SubEditableField
      force={props.index == 0 ? true : false}
      classNameKey={'start'}
      value={start.value}
      valid={start.valid}
      updateValue={(v) => {
        let value = parseFloat(v);
        collectValueForValidation(value, props.index, true);
        let isValid = isValidValue(value, props.index, true);
        setStart({ value: value, valid: isValid });
        props.updateStart(value);
      }}
    />
    {
      props.children
    }
    <StartEndTime_SubEditableField
      classNameKey={'end'}
      value={end.value}
      valid={end.valid}
      updateValue={(v) => {
        let value = parseFloat(v);
        collectValueForValidation(value, props.index, false);
        let isValid = isValidValue(value, props.index, false);
        setEnd({ value: value, valid: isValid });
        props.updateEnd(value);
      }}
    />
  </>);
});

export default StartEndTime_ValidateAndDisplay;