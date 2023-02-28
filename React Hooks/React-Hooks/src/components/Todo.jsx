import React, { useEffect, useState } from 'react';

/*
  INSTRUCTIONS:
  Create a "todo" app with the following criteria.
    1. The user can add new todo items
    2. The user can remove todo items
*/

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const addTask = () => {
    setTasks((tasks) => tasks.concat(input));
    setInput('');
  };
  const deleteTask = (i) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task, i) => {
          return (
            <li key={i}>
              {task}
              <button onClick={() => deleteTask(i)}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
