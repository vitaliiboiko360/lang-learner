import React from 'react'

import SubStartEndTimeEditableField from './sub_start_end_time.tsx'

const StartEndTimeValidate = React.forwardRef((props, timePointsRef) => {
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
    //console.log(`isValid_0=${isValid_0} isValid_1=${isValid_1} isValid_2=${isValid_2}`);
    //console.log(`(isValid_0 && isValid_1 && isValid_2)=${(isValid_0 && isValid_1 && isValid_2)}`);
    if (isValid_0 && isValid_1 && isValid_2) {
      //console.log(`returned true`);
      return true;
    }
    //console.log(`returened false`);
    return false;
  }
  //console.log(`START v:${start.value} valid:${start.valid}\t END v:${end.value} valid:${end.valid}`);
  return (<>
    <SubStartEndTimeEditableField
      force={props.index == 0 ? true : false}
      classNameKey={'start'}
      value={start.value}
      valid={start.valid}
      updateValue={(v) => {
        let value = parseFloat(v);
        collectValueForValidation(value, props.index, true);
        let isValid = isValidValue(value, props.index, true);
        setStart({ value: value, valid: isValid });
        //console.log(`isValid ${isValid}`);
        //console.log(`start valid ${start.valid}`);
        props.updateStart(value);
      }}
    />
    {
      props.children
    }
    <SubStartEndTimeEditableField
      classNameKey={'end'}
      value={end.value}
      valid={end.valid}
      updateValue={(v) => {
        let value = parseFloat(v);
        collectValueForValidation(value, props.index, false);
        let isValid = isValidValue(value, props.index, false);
        setEnd({ value: value, valid: isValid });
        //console.log(`isValid ${isValid}`);
        //console.log(`end valid ${end.valid}`);
        props.updateEnd(value);
      }}
    />
  </>);
});

export default StartEndTimeValidate;