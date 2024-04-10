import { ToDo } from './components/ToDo';

export const App = () => {
  return (
    <div className='text-4xl text-center m-5 pb-10'>
      To Do List
      <ToDo />
    </div>
  );
};
