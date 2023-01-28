import Modal from "./Modal"
import { useState } from 'react'
import './addTask.css'
// import {db} from './firebase'
import { Timestamp } from 'firebase/firestore'
import { addTodo, getData } from "./store/Todo"
import { useDispatch } from "react-redux"

function AddTask({ onClose, open }) {

  const dispatch = useDispatch();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  /* function to add new task to firestore using redux*/

  const handleSubmit = (e) => {
    console.log('chl raha hun');
    e.preventDefault()
    const id = new Date().getTime();

    const data = {
      id,
      title,
      description,
      completed: false,
      created: Timestamp.now()
    }
    dispatch(addTodo(data)).unwrap()
      .then((data) => {
        console.log(data)
      });
    dispatch(getData())
    alert('Add Todo success');


    onClose()

  }

  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder='Enter title' />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task description'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form>
    </Modal>
  )
}

export default AddTask
