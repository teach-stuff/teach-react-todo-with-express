import React from 'react';

const Item = ({ todo, toggleCompleted, deleteTodo }) => (
  <li className={todo.completed ? 'complete' : 'uncompleted'}>
    <button onClick={toggleCompleted} className="done">
      &#10003;
    </button>
    <span>{todo.name}</span>
    <button className="delete" onClick={deleteTodo}>
      &#128465;
    </button>
  </li>
);

export default Item;
