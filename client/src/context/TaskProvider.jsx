import { createContext, useContext, useState } from "react";
import {
  getTasksRequets,
  deleteTaskRequest,
  createTaskRequest,
  getOneTaskRequets,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from "../pages/api/tasks.api";
import { TaskContext } from "./TaskContext";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used whihin a TaskContextProvider");
  }
  return context;
};

//TaskContextProvider agrupa todos los componentes
export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  //Esta función solo sirve para ejecutar la promesa de traer las tareas, y luego la ejecutamos abajo
  async function loadTasks() {
    const response = await getTasksRequets();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    try {
      const request = await deleteTaskRequest(id);
      //Recoremos todas las tareas y si el id enviado es diferente del id que está recoriendo dejalo, si es igual quitalo. Y enviamos todo como las nuevas tareas
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.log("Error =>" + e);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      //Podriamos añadir las tareas nuevas al arreglo y así evitar peticiones al servidor, en este caso no es necesario
      //setTasks([...tasks, response.data])
      console.log(response);
    } catch (e) {
      console.log("Error => " + e);
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getOneTaskRequets(id);
      return response.data;
    } catch (e) {
      console.log("Error =>" + e);
    }
  };

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      console.log(response);
    } catch (e) {
      console.log("Error => " + e);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
        //Si de las tareas que tengo hay una con el recorrido hay una que es igual a la que recibo, seleccionala
        const taskFound = tasks.find((task) => task.id === id);  
        console.log(taskFound, tasks);   
        await toggleTaskDoneRequest(id, taskFound.done === 0 ? true : false);
        //Por cada tarea del arreglo yo lo voy a estar recoriendo y buscando el id que estoy actualizando, Si lo encuentra hago otra comparación
        //porque tengo que colocar 0 o 1, entocnes si lo encuentra le pone 0 o 1 dependiendo y si el id o se encuentra se pone el original
        tasks.map(task => task.id === id ? task.done = task.done === 0 ? 1 : 0 : task.done );
        setTasks([...tasks]);
        /*Otra forma de hacer estas dos lineas igual
            setTasks(
            tasks.map((task) => 
                task.id === id ? { ...task, done: !task.done } : task 
            )
        );
        */
    } catch (e) {
        console.log('Error => '+ e);
    }
  };




  //Basicamente estoy exportanto las funciones del brud task a sus difernetes compoents
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
