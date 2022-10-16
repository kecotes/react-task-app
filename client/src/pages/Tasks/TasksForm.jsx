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
        onSubmit={ async (values, actions) => {
          console.log(values)
          try {
            const response = await createTaskRequest(values)
            console.log(response)
            actions.resetForm()
          } catch(e) { 
            console.log('Error => '+ e)
          }
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

            
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Enviar" }</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
