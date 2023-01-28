import './task.css'
import { useState } from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { doc, updateDoc } from "firebase/firestore";
import { db } from './firebase'
import { useDispatch } from 'react-redux';
import { deleteTodo, getData, updateTodocheck } from './store/Todo';

function Task({ id, title, description, completed }) {

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({ edit: false, view: false })

  const handleClose = () => {
    setOpen({ edit: false, view: false })
  }

  /* function to update firestore */
  const handleChange = async () => {
    console.log('edit', id)
    const data = {
      id,
      checked
    }
    dispatch(updateTodocheck(data)).unwrap()
      .then((data) => {
        console.log(data)
      });
    dispatch(getData())

  }

  /* function to delete a document from firestore using redux */
  const handleDelete = (id) => {
    dispatch(deleteTodo(id)).unwrap()
      .then((data) => {
        console.log(data)
      });
    dispatch(getData())
    alert('delete Todo success');
  }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className='checkbox-custom'
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox" />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button
              className='task__editButton'
              onClick={() => setOpen({ ...open, edit: true })}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={() => { handleDelete(id) }}>Delete</button>
          </div>
          <button
            onClick={() => setOpen({ ...open, view: true })}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view} />
      }

      {open.edit &&
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task