import React, { useState, useEffect } from 'react';
import Item from './Item';

const url = 'http://localhost:3001/';

function App() {
  const [status, setStatus] = useState('LOADING');
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [edittext, setEdittext] = useState('');

  useEffect(() => {
    const promiseFunc = async () => {
      try {
        const response = await fetch(url);
        const todos = await response.json();
        setTodos(todos);
        setStatus('SUCCESS');
      } catch (error) {
        console.log('error', error);
        setStatus('ERROR');
      }
    };

    promiseFunc();
  }, []);

  const addItem = async (event) => {
    event.preventDefault();
    if (input === '') return;

    console.log(input);
    setStatus('LOADING');
    const payload = { name: input };
    try {
      const response = await fetch(`${url}create`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const todos = await response.json();
      setTodos(todos);
      setStatus('SUCCESS');
      setInput('');
    } catch (error) {
      console.log('error', error);
      setStatus('ERROR');
    }
  };

  const toogle = async (i) => {
    console.log(i);
    const payload = { index: i };
    try {
      const response = await fetch(`${url}toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const todos = await response.json();
      setTodos(todos);
      setStatus('SUCCESS');
      setInput('');
    } catch (error) {
      console.log('error', error);
      setStatus('ERROR');
    }
  };

  const deleteTodo = async (i) => {
    console.log(i);
    const payload = { index: i };
    try {
      const response = await fetch(`${url}delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const todos = await response.json();
      setTodos(todos);
      setStatus('SUCCESS');
      setInput('');
    } catch (error) {
      console.log('error', error);
      setStatus('ERROR');
    }
  };

  const editName = async (i) => {
    console.log(edittext + '-' + i);
    if (edittext !== '' || edittext === undefined) {
      const payload = { name: edittext, index: i };
      try {
        const response = await fetch(`${url}editname`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const todos = await response.json();
        setTodos(todos);
        setStatus('SUCCESS');
        setInput('');
      } catch (error) {
        console.log('error', error);
        setStatus('ERROR');
      }
    }
  };

  return (
    <div
      className="wrapper"
      style={{ opacity: status === 'LOADING' ? 0.5 : 1 }}
    >
      <form onSubmit={addItem}>
        <input
          type="text"
          disabled={status === 'LOADING'}
          onChange={(event) => setInput(event.target.value)}
          value={input}
          className="todo-input"
          placeholder="Add item..."
        />
        <button className="todo-button" type="submit">
          +
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li className={todo.completed ? 'complete' : 'uncompleted'}>
            <button onClick={() => toogle(index)} className="done">
              &#10003;
            </button>
            <form onSubmit={() => editName(index)}>
              <textarea
                value={todo.name}
                onChange={(event) => setEdittext(event.target.value)}
              ></textarea>
              <button type="submit" className="submit" value="Submit">
                {' '}
                &#x1f589;
              </button>
            </form>
            <button
              className="delete"
              onClick={() => {
                deleteTodo(index);
              }}
            >
              &#128465;
            </button>
          </li>
        ))}
      </ul>

      <div className="actions">
        <div className="left total">
          {' '}
          {
            todos.filter(function (s) {
              return !s.completed;
            }).length
          }{' '}
          items remaining
        </div>
        <div className="right">
          <button
            className="delete-complete"
            onClick={() => {
              setTodos(
                todos.filter(function (s) {
                  return !s.completed;
                })
              );
            }}
          >
            Delete completed items
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
