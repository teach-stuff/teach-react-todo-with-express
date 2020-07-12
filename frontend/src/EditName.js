import React, { useState, useRef } from 'react';
import { url } from './App';

const EditName = ({ todo, index }) => {
  const [edited, setEdited] = useState(todo.name);
  const debounceTimeout = useRef(undefined);

  console.log('component rendered');

  const editName = async (name) => {
    if (name !== '' || name === undefined) {
      const payload = { name, index };

      console.log('making request', payload);

      try {
        const response = await fetch(`${url}editname`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const resJson = await response.json();
        console.log('REQUEST SUCCESS!', resJson);
      } catch (error) {
        console.log('error', error);
        return;
      }
    }
  };

  return (
    <textarea
      value={edited}
      onChange={(event) => {
        const name = event.target.value;
        setEdited(name);

        if (debounceTimeout.current) {
          console.log('cleared previous timeout');
          clearTimeout(debounceTimeout.current);
        }
        console.log('set new timeout');
        debounceTimeout.current = setTimeout(() => {
          editName(name);
        }, 1000);
      }}
    ></textarea>
  );
};

export default EditName;
