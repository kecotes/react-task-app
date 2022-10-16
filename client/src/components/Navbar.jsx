import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <h2>Lista de Tareas</h2>

        <ul>
            <li>
                <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/new">Añadir Tarea</Link>
            </li>
        </ul>

    </div>
  )
}

export default Navbar