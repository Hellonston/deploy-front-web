import Navbar from './components/Navbar'
import ReactCardSlider from './components/Slider'
import logo from './assets/logo.png'
import preparing from './assets/preparing.png'
import buying from './assets/buying.png'
import marching from './assets/marching.png'
import fighting from './assets/fighting.png'
import soldier from './assets/atila2.png'
import archer from './assets/arquero2.png'
import knight from './assets/caballero.png'
import castle from './assets/castle.png'


export default function Reglas() {
    const slides = [
        {image:logo, title:"Objetivos del juego", description:"Tu objetivo al jugar Empires Ascendant es derrotar a las otras 3 naciones contrincantes al derribar todos sus centros urbanos."},
        {image:preparing, title:"Al comenzar el juego", description:"Cada jugador empieza en una esquina del mapa con un centro urbano y 5 de oro, solo podrás construir en tu cuadrante del mapa."},
        {image:buying, title: "El Oro", description:"Recibirás 3 de estos al inicio de tu turno mas 2 por cada centro urbano en tu poder, y este te servirá para comprar unidades o construir estructuras."},
        {image:marching, title: "Puntos de Acción", description: "Cada turno comenzarás con 10 puntos de acción, los cuales puedes utilizar para mover tus tropas o, junto con oro, construir estructuras."},
        {image:fighting, title: "Combate", description:"Luego de mover tus tropas y que estas se encuentren en rago de ataque, puedes hacer que estas ataquen tropas o estructuras enemigas."},
        {image:soldier, title: "Unidades: Soldado", description:"El soldado es una unidad simple: ataque moderado, puntos de vida moderados y un bajo costo de compra. Este se especializa en combate cuerpo a cuerpo."},
        {image:archer, title: "Unidades: Arquero", description:"El arquero es una unidad con alto ataque pero bajos puntos de vida. Esto lo compensa con un gran rango de ataque, permitiendole atacar enemigos a 2 casillas de distancia."},
        {image:knight, title: "Unidades: Caballero", description:"El caballero es una unidad cara, pero lo que hace que este valga la pena son sus altos puntos de vida y la habilidad de moverse mas casillas por menos puntos de acción."},
        {image:castle, title: "Estructuras", description:"En Empires Ascendant existen 4 tipos distintos de estructuras. Los centros urbanos, que aportan ingresos de oro por turno, los cuarteles que producen soldados, las arquerías que producen arqueros y las cabalerizas que producen caballeros."}
    ];

    return(
        <>
        <Navbar className="navbar"/>
        <body>
        <ReactCardSlider slides={slides}/>
        </body>
        </>
    )
    
}