import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TasksPage from './pages/Tasks/TasksPage'
import TasksForm from './pages/Tasks/TasksForm'
import NotFound from './pages/NotFound'
import TasksUpdate from './pages/Tasks/TasksUpdate'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <TasksPage /> } />
        <Route path='*' element={ <NotFound /> }/>
        <Route path='/new' element={ <TasksForm /> } />
        <Route path='/update/:id' element={ <TasksUpdate /> } />
      </Routes>
    </>
  )
}

export default App
