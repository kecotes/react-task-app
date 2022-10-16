import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {

  const navigate = useNavigate();
  const { deleteTask, toggleTaskDone } = useTasks();
  //Function load task movign to TaskProvider
  
  const handleDone = async () => {
    console.log('1?-'+task.id)
    await toggleTaskDone(task.id);
  }


  return (
    <div>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <span>{task.done == 1 ? "Hecho " : "Falta "}</span>
      <span>{task.createAt}</span>
      <button onClick={() => navigate('/update/'+task.id)}>Editar</button>
      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
      <button onClick={() => handleDone(task.done)}>Estado tarea</button>
    </div>
  );
}

export default TaskCard;
