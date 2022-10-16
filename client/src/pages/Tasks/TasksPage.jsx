import { useEffect, useState } from 'react'
import TaskCard from '../../components/TaskCard'
import { getTasksRequets } from '../api/tasks.api'

function TasksPage() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    
    //Esta función solo sirve para ejecutar la promesa de traer las tareas, y luego la ejecutamos abajo
    async function loadTasks() {
      const response = await getTasksRequets()
      setTasks(response.data)
    }
    loadTasks();

  }, [])

  return (
    <div className="listTasks">
      <h2>TasksPage</h2>

      {
        tasks.map(task => (
          <TaskCard task={task} key={task.id}/>
        ))
      }
    </div>   
  )
}

export default TasksPage