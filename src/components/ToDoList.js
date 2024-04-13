import { useState } from 'react';

export const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [addInput, setAddInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setError('');
    setAddInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const deleteAll = () => {
    setTodos([]);

    setError('Nothing to delete');
  };

  const ErrorText = () => {
    if (addInput === '' || addInput === undefined) {
      setError('Please enter a to do item!');
    } else {
      setTodos([...todos, addInput]);
      setAddInput('');
    }
  };

  const handleDeleteTodo = (text) => {
    const newTodos = todos.filter((todo) => {
      return todo !== text;
    });

    setTodos(newTodos);
  };

  return (
    <div>
      <div class='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div class='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]'>
          <h3 className='text-4xl pt-10 text-center font-semibold pb-10'>To Do List</h3>
          <form onSubmit={handleSubmit}>
            <div className='text-center'>
              <input
                className='border p-3 text-2xl font-semibold rounded-md'
                type='text'
                name='text'
                value={addInput}
                placeholder='Eg. Cook dinner'
                onChange={handleChange}
              ></input>
              <button
                className='border ml-5 text-2xl font-semibold bg-purple-300 p-3 pl-5 pr-5 rounded-md'
                onClick={ErrorText}
              >
                Add
              </button>
              <button
                className='border ml-5 text-2xl font-semibold bg-purple-300 p-3 pl-5 pr-5 rounded-md'
                onClick={deleteAll}
              >
                Delete all
              </button>
              <div className='text-red-500 text-center'>{error}</div>
            </div>
          </form>
          <div>
            <ol className='list-decimal text-xl font-semibold text-center list-inside mt-5 mb-5'>
              {todos.map((todo) => (
                <li key={todo}>
                  {todo} <button onClick={() => handleDeleteTodo(todo)}>✅</button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
     
    </div>
  );
};
