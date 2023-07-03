import React from 'react'
import Navbar from '../../components/Navbar'
import pergamino from '../LeaderBoards/assets_LeaderBoards/img/pergamino.png'
import './LeaderBoards.css'
import Leaderboard from './LeaderBoardsComponents/LeaderBoard';


const playerData = [
  { name: 'John Doe', score: 1000 },
  { name: 'Jane Smith', score: 900 },
  { name: 'Alex Johnson', score: 800 },
];

function LeaderBoards() {
  return (
    <>
    <header> 
        <Navbar className="navbar"/>
    </header>
    <body>
    
        <div className='pergamino'>
          
            {/* <img src={pergamino} alt="" 
            /> */}
            <div className="pergamino-wrapper">
            <img src={pergamino} alt="Pergamino 1" className="pergamino" />
            <span className="pergamino-text">
              <Leaderboard data={playerData} />
            </span>
            </div>
            <div className="pergamino-wrapper">
            <img src={pergamino} alt="Pergamino 2" className="pergamino" />
            <span className="pergamino-text">
              {/* <div className='instrucciones_ranking'> */}
                <h2> Instrucciones</h2>
                <h3>La puntuación se basa en la <br /> cantidad de centros urbanos<br />creados edificios construidos, oro total recolectado <br />edificios enemigos <br /> destruidos y 
                milicias creadas. <br />
                Al lado derecho puedes ver a los mejores jugadores </h3>
                

                

            {/* </div> */}
            </span>
            </div>




            {/* <img src={pergamino} alt="" /> */}
            {/* <div className="leaderboard"> */}
            
            {/* </div> */}
            
            
        </div>
    </body>
    
    </>
  )
}
export default LeaderBoards





