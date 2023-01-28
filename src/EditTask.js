import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { useDispatch } from "react-redux"

import { updateTodo,getData } from "./store/Todo";
// import { doc, updateDoc } from "firebase/firestore";
// import {db} from './firebase'

function EditTask({open, onClose, toEditTitle, toEditDescription, id}) {

  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)

  const dispatch = useDispatch();

  /* function to update firestore using redux */
  const handleUpdate =  (e) => {
    e.preventDefault()
    const data = {
      id,
      title,
      description

    }
    dispatch(updateTodo(data)).unwrap()
    .then((data) => {
      console.log(data)
    });
    dispatch(getData())
      onClose()
    } 
    
  

  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value.toUpperCase())} value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
