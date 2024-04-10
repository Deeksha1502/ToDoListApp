import { useState } from 'react';

export const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [addInput, setAddInput] = useState('');

  const handleChange = (e) => {
    setAddInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addInput !== '') setTodos([...todos, addInput]);
    setAddInput('');
  };

  const handleDeleteTodo = (text) => {
    const newtodods = todos.filter((todo) => {
      return todo !== text;
    });
    setTodos(newtodods);
  };

  return (
    <div class='m-10'>
      <form onSubmit={handleSubmit}>
        <input
          className='border'
          type='text'
          name='text'
          value={addInput}
          onChange={handleChange}
        ></input>
        <button className='border ml-5'>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>
            {todo} <button>✅</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
