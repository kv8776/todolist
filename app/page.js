"use client"
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [maintask, setMainTask] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState(''); // Track edited task's title
  const [editDes, setEditDes] = useState(''); // Track edited task's description

  const submitHandle = (e) => {
    e.preventDefault();
    setMainTask([...maintask, { title, des }]);
    setTitle('');
    setDes('');
  };

  const deleteTask = (i) => {
    const copyTask = [...maintask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editTask = (i) => {
    setEditingIndex(i);
    setEditTitle(maintask[i].title);
    setEditDes(maintask[i].des); 
  };

  const saveTask = (i) => {
    const copyTask = [...maintask];
    copyTask[i] = { title: editTitle, des: editDes }; // Update task with edited title and description
    setMainTask(copyTask);
    setEditingIndex(-1);
    setEditTitle(''); // Reset edited title
    setEditDes(''); // Reset edited description
  };

  let renderTask = <h2>No task available</h2>;

  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => (
      <li key={i} className='mb-4 flex justify-between'>
        <div className='flex justify-between items-center mb-5 w-2/3'>
          {editingIndex === i ? (
            <>
              <input
                type='text'
                className='text-xl font-semibold'
                value={editTitle} // Use edited title
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type='text'
                className='text-lg font-medium'
                value={editDes} // Use edited description
                onChange={(e) => setEditDes(e.target.value)}
              />
            </>
          ) : (
            <>
              <h5 className='text-xl font-semibold'>{t.title}</h5>
              <h6 className='text-lg font-medium'>{t.des}</h6>
            </>
          )}
        </div>
        {editingIndex === i ? (
          <button onClick={() => saveTask(i)} className='bg-blue-600 text-white px-4 py-2 rounded font-bold'>
            Save
          </button>
        ) : (
          <button onClick={() => editTask(i)} className='bg-green-600 text-white px-4 py-2 rounded font-bold'>
            Edit
          </button>
        )}
        <button onClick={() => deleteTask(i)} className='bg-red-600 text-white px-4 py-2 rounded font-bold'>
          Delete
        </button>
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-black text-white font-bold text-center p-5 text-5xl'>Todo list</h1>
      <form onSubmit={submitHandle}>
        <input
          type='text'
          required
          className='text-2xl border-zinc-950 border-2 m-8 px-4 py-2'
          placeholder='Enter Task here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-2xl border-zinc-950 border-2 m-8 px-4 py-2'
          placeholder='Description here'
          value={des}
          required
          onChange={(e) => setDes(e.target.value)}
        />
        <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Enter</button>
      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
