import { Form, Formik } from "formik";
import { useTasks } from "../../context/TaskProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TasksForm() {
  /* const {text} = useTask()
  console.log(text) */

  const { createTask, getTask, updateTask } = useTasks();

  //Para poder pasar los datos de edit
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  //console.log(params); // Object { id: "18" }

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const getingTask = await getTask(params.id);
        setTask({
          title: getingTask.title,
          description: getingTask.description,
        });
      }
    };
    //Luego de que cargue la promesa la ejecuto
    loadTask();
  }, []);

  return (
    <div className="formTasks">
      <h2>{params.id ? "Editar Tarea" : "Crear Tarea"}</h2>

      <Formik
        //Datos iniciales del formulario que se iran actualizando
        /* initialValues={{
          title: "",
          description: "",
        }} */
        initialValues={task}
        //Formik no reiniciliza los valroes por defecto, una vez le damos uno antiguo se queda con eso, para eso, está propiedad
        enableReinitialize={true}
        //Aqui verificamos los datos enviados
        onSubmit={async (values, actions) => {
          console.log(values);
          //Funtion create task moving to TaskProvider

          if (params.id) {
            await updateTask(params.id, values);
            navigate('/');
          } else {
            await createTask(values);
          }

          actions.resetForm();
        }}
      >
        {/* Abrimos una funcion de jsx la cual tiene la función handleChange escuchando los cambios. handleSubmit ejecuta el formulario */}
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>Titulo</label>
            <input
              type="text"
              name="title"
              placeholder="Escribe el titulo de la tarea"
              value={values.title}
              onChange={handleChange}
            />

            <label>Descripción</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Escribe la descripción de tu tarea"
              value={values.description}
              onChange={handleChange}
            ></textarea>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
