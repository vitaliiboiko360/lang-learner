import React from 'react'
import { forwardRef } from 'react';

const SubStartEndTime = forwardRef((props, ref) => {
  const localClassName = (props.value == 0 && props.force != true) ? 'unassigned' : props.className;
  const className = `sub ${localClassName}`;
  return (
    <sub ref={ref} className={className} contentEditable suppressContentEditableWarning={true}>{props.value}</sub>
  );
});

export function SubStartEndTimeEditableField(props) {

  const subRef = React.useRef(null);

  React.useEffect(() => {

    subRef.current.addEventListener("input", (event) => {
      event.stopPropagation();
      //console.log(event);
      const fieldLenghtLimit = 4;
      const fieldDataLength = subRef.current.innerText.length;
      //console.log(`subRef.current.innerText ${subRef.current.innerText}`);
      if (fieldDataLength >= fieldLenghtLimit) {
        subRef.current.innerText = subRef.current.innerText.slice(0, fieldLenghtLimit);
      }
    });
    // var limit = 3;
    // subRef.current.keypress(function () {
    //   return this.innerHTML.length < limit;
    // }).on({
    //   'paste': function (e) {
    //     var len = this.innerHTML.length,
    //       cp = e.originalEvent.clipboardData.getData('text');
    //     if (len < limit)
    //       this.innerHTML += cp.substring(0, limit - len);
    //     return false;
    //   },
    //   'drop': function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }
    // });
  }, []);

  return (
    <SubStartEndTime ref={subRef} {...props} />
  );
}

export default SubStartEndTime;