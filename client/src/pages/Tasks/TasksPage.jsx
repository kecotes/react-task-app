import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard";
import { useTasks } from '../../context/TaskProvider'

function TasksPage() {

  const { tasks, loadTasks } = useTasks()

  useEffect(() => {
    
    loadTasks();
  }, []);


  function renderMain() {

    if(tasks.length === 0 ) return <h4>No hay Tareas pendientes</h4>

    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  }


  return (
    <div className="listTasks">
      <h2>TasksPage</h2>
      {renderMain()}
    </div>
  );
}

export default TasksPage;
