import { useState, useContext } from "react"
import Navbar from '../components/Navbar'
export default function UserWelcome() {
  const [nombre, setNombre] = useState(null);

  function handleChange(nombre) {
    setNombre(nombre);
  }

  return (
    <>
    <header> 
        <Navbar className="navbar"/>
    </header>
    
      <h2>Mi primer componente!</h2>
      <input
        onChange={e => handleChange(e.target.value)}
      />
      <p>Bienveni@, { nombre }!</p>
    </>
  )
}