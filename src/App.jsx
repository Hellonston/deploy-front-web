import './App.css'
import Navbar from './components/Navbar'
import logo from './assets/logo.png'

function App() {

  return (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width"/>
    <title>Empires Ascendant</title>
    <link rel="stylesheet" href="/App.css" />
    <Navbar className="navbar"/>

    <ul>
    <img src={logo}></img>
    <h1 className='titulo'>Empires Ascendant</h1>
    </ul>
  </>
  )
}

export default App
