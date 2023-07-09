import ListaPokes from "./components/ListaPokes"
import Encabezado from "./components/Encabezado"
import './assets/css/style.css'

function App() {
  

  return (
    <>
      <Encabezado/>
     <div className="container"> 
      <ListaPokes/>
     </div>
    </>
  )
}

export default App
