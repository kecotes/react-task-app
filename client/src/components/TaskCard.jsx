
function TaskCard({task}) {
  return (
    <div>
        <strong>{task.title}</strong>
        <p>{task.description}</p>
        <span>{task.done == 1 ? "Hecho " : "Falta " }</span>
        <span>{task.createAt}</span>
        <button>Editar</button>
        <button>Eliminar</button>
    </div>
  )
}

export default TaskCard
