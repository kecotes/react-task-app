import { Form, Formik } from "formik";
import { createTaskRequest } from '../api/tasks.api'

function TasksForm() {
  return (
    <div className="formTasks">
      <h2>TasksForm</h2>
      <Formik
        //Datos iniciales del formulario que se iran actualizando
        initialValues={{
          title: "",
          description: "",
        }}
        //Aqui verificamos los datos enviados
        onSubmit={ async (values) => {
          console.log(values)
          try {
            const response = await createTaskRequest(values)
            console.log(response)
          } catch(e) { 
            console.log('Error => '+ e)
          }
        }}
      >
        {/* Abrimos una funcion de jsx la cual tiene la función handleChange escuchando los cambios. handleSubmit ejecuta el formulario */}
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Titulo</label>
            <input
              type="text"
              name="title"
              placeholder="Escribe el titulo de la tarea"
              onChange={handleChange}
            />

            <label>Descripción</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Escribe la descripción de tu tarea"
              onChange={handleChange}
            ></textarea>

            <input type="submit" value="Enviar" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
