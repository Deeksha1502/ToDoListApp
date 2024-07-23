import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

const getLocalItems = () => {
  let list = localStorage.getItem('todos');
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem('todos'));
  } else {
    return [];
  }
};

export const ToDoList = () => {
  const [todos, setTodos] = useState(getLocalItems);
  const [addInput, setAddInput] = useState([]);
  const [error, setError] = useState('');

  console.log(todos);

  const handleChange = (e) => {
   
    setAddInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const deleteAll = () => {
    setTodos([]);
    setError(' ');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleButtonDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const ErrorText = () => {
    if (addInput === '' || addInput === undefined) {
      setError('Please enter a to do item!');
    } else {
      addTodo(addInput);
      setAddInput('');
    }
  };

  const addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      isChecked: false,
    };
    const copyListItems = [...todos];
    copyListItems.push(newTodo);

    setTodos(copyListItems);
    console.log('ths is copyListItems in addtodo', copyListItems);
  };

  const checkItems = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo))
    );
  };

  return (
    <div>
      <div class='.bg-repeat inset-0 min-h-full -z-10  w-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:9rem_8rem]'>
        <div class='w-screen  min-h-full absolute bg-gradient-to-r .bg-repeat'>
          <h3 className='text-4xl pt-10 text-center text-gray-800 font-bold pb-10 '>To Do List</h3>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
              <input
                className='px-4 py-2 flex items-center border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500  p-3 text-2xl font-semibold rounded-md'
                type='text'
                name='text'
                value={addInput}
                placeholder='Eg. Cook dinner'
                onChange={handleChange}
              ></input>
              <button
                className='border ml-5 text-2xl font-semibold bg-blue-200 hover:bg-blue-100 p-3 pl-5 pr-5 rounded-md'
                onClick={ErrorText}
              >
                Add
              </button>
              <button
                className='border ml-5 text-2xl font-semibold bg-blue-200 hover:bg-blue-100 p-3 pl-5 pr-5 rounded-md'
                onClick={deleteAll}
              >
                Delete all
              </button>
              <div className='text-red-500 text-center'>{error}</div>
            </div>
          </form>
          <div>
            <ol className='text-xl font-semibold text-center list-inside mt-5 mb-5'>
              {todos.map((todo) => (
                <div className='flex items-center content-center lg:mx-96' key={todo.id}>
                  <input
                    type='checkbox'
                    checked={todo.isChecked}
                    onChange={() => checkItems(todo.id)}
                    className=' m-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <li className={todo.isChecked ? 'line-through' : ''}>
                    <span className=' p-3 text-center flex justify-center text-2xl'>
                      {todo.text}
                    </span>{' '}
                  </li>
                  {todo.isChecked && (
                    <button className='mx-4' onClick={() => handleButtonDelete(todo.id)}>
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

//
