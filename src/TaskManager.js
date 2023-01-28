import './taskManager.css'
import Task from './Task'
import { useState, useEffect } from 'react'
import AddTask from './AddTask'
import { useSelector, useDispatch } from "react-redux";

import { getData } from './store/Todo'

function TaskManager() {

  // redux work
  const dispatch = useDispatch();
  const { todoReducer } = useSelector((state) => state);
  console.log('dataList', todoReducer)



  const fetchData = () => {
    dispatch(getData())
      .unwrap()
      .then((data) => {
        console.log(data)
      });
  };

  useEffect(() => {
    fetchData();
  }, [])

  const [openAddModal, setOpenAddModal] = useState(false)
  // const [tasks, setTasks] = useState([])
  // /* function to get all tasks from firestore in realtime */ 

  // useEffect(() => {
  //   const taskColRef = query(collection(db, 'tasks'), orderBy('created', 'desc'))
  //   onSnapshot(taskColRef, (snapshot) => {
  //     setTasks(snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })))
  //   })
  // },[])

  return (
    <div className='taskManager'>
      <header>Task Manager</header>
      <div className='taskManager__container'>
        <button
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
        <div className='taskManager__tasks'>

          {todoReducer?.dataList?.map((task) => (
            <Task id={task.id}
              key={task.id}
              completed={task.completed}
              title={task.title}
              description={task.description}
            />
          ))}

        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      }

    </div>
  )
}

export default TaskManager
