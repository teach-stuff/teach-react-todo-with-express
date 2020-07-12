import React, { useState, useRef } from 'react';
import { url } from './App';

const EditName = ({ todo, index }) => {
  const [edited, setEdited] = useState(todo.name);
  const debounceTimeout = useRef(undefined);

  const editName = async (name) => {
    if (name !== '' || name === undefined) {
      const payload = { name, index };
      try {
        const response = await fetch(`${url}editname`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const resJson = await response.json();
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
          clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
          editName(name);
        }, 1000);
      }}
    ></textarea>
  );
};

export default EditName;
