import React from 'react';

export default function ButtonSubmit_AudioTextSyncTime(props) {

  const onClick = () => {
    let data = {
      data: 'testing',
    }
    let options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
    fetch('http://192.168.1.12:4004/', options);
  };

  return (
    <button onClick={onClick}>
      'Submit Audio-Text Sync'
    </button>
  );
}