import React from 'react';

const Item = ({ todo, toggleCompleted, deleteTodo, editTodo }) => (
  <li className={todo.completed ? 'complete' : 'uncompleted'}>
    <button onClick={toggleCompleted} className="done">
      &#10003;
    </button>
    <form onSubmit={editTodo}>
      <textarea>{todo.name}</textarea>
      <input type="submit" className="submit" value="Submit"></input>
    </form>
    <button className="delete" onClick={deleteTodo}>
      &#128465;
    </button>
  </li>
);

export default Item;
