
import {MouseEvent, useRef, useEffect, useState} from 'react';
import './Boards.css';
import axios from 'axios';
import { Archer, Knight, Soldier, Vacio } from './troop';
import { Building, Archery, Barracks, Stable} from './building';
import { Player } from './player';
import { Game } from './game';
import { move} from './move';
import { Estadisticas } from './Statistic/Statistic';
import Tile from './Tile/Tile';
import { searchPlayer, updateMap, updateBuildingsMap, updateTroopsMap, searchPlayerByTroopId, searchTroopByTroopId } from './searchFunctions';

const verticalAxis = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G" ,"H" ,"I" ,"J"];


let initialBoardState = [];
let piezaActual = NaN;
let listaJugadores: Player[] = [];
//creamos juego
const juego1 = new Game(1, [horizontalAxis, verticalAxis]);
// creamos jugadores
var p1 = new Player("jorge", 1);
var p2 = new Player("jorge2", 2);
juego1.addPlayer(p1);
juego1.addPlayer(p2);


//crear lista juegos en desarrollo
var listaJuegosEnDesarrollo: Game[] = [];
listaJuegosEnDesarrollo.push(juego1);
//como en cada juego ya hay una lista con los jugadores, no hace falta crear una lista de jugadores

//creamos tropas
// p2.createTroop("knigth", 9, 7);
// // const tropa5 = createTroop(p2, "knight", 9, 7); //para probar id =1
// p1.createTroop("archer", 0, 1);
// p1.createTroop("knight", 0, 2);
// p1.createTroop("soldier", 0, 3);

// p2.createTroop("archer", 9, 8);
// p2.createTroop("knight", 9, 6);

// const tropa5 = createTroop(p2, "knight", 9, 7);
console.log(p1.troops, 'tropas p1');
//PARA PROBA EN LA BDD


//Se actualiza con lo que hay actualmente en la bdd
await updateMap(juego1); 
console.log(juego1.players, 'jugadores!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

//se carga todo lo que respecta a jugadores
juego1.players.forEach(player => {
    player.troops.forEach(troop => {
        console.log(troop, 'tropas');
        initialBoardState.push( {troopOrBuilding: troop} );
    });
});
juego1.players.forEach(player => {
    player.buildings.forEach(building => {
        console.log(building, 'buildings');
        initialBoardState.push( {troopOrBuilding: building} );
    });
});




let activePiece: HTMLElement | null = null;
var xAnterior = 0;
var yAnterior = 0;
var movePie = true;

function Boards() {
    let board = [];
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [attackDirection, setAttackDirection] = useState('');
    const [attackSending, setAttackSending] = useState(false);
    const [troopType, setTroopType] = useState('');
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [troopsList, setTroopsList] = useState([]);
    const [sending, setSending] = useState(false);
    const [pieces, setPieces] = useState(initialBoardState);
    const gameBoardRef = useRef<HTMLDivElement>(null);

    
    

    function handleTroopTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setTroopType(event.target.value);
      }
    
    function handleCoordinateChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
      let parsedValue = parseInt(value);
    
      // Verificar si el valor está dentro del rango permitido
      if (parsedValue >= 0 && parsedValue <= 9) {
        setCoordinates((prevCoordinates) => ({ ...prevCoordinates, [name]: parsedValue }));
      } else {
        // Si el valor está fuera del rango, establecer el valor mínimo o máximo permitido
        if (parsedValue < 0) {
          parsedValue = 0;
        } else if (parsedValue > 9) {
          parsedValue = 9;
        }
        setCoordinates((prevCoordinates) => ({ ...prevCoordinates, [name]: parsedValue }));
      }
    }

    function handleSendData() {

      // Enviar los datos al frontend aquí
        console.log('Enviar datos:', troopType, coordinates);
        let jugadorActual = juego1.players[0];
        console.log(jugadorActual, 'jugador actual');
        
        let structOrTroop = "";

        if (troopType.toLowerCase() === "archer" || troopType.toLowerCase() === "knight" || troopType.toLowerCase() === "soldier"){
            structOrTroop = "troop";
        }
        else if (troopType.toLowerCase() === "archery" || troopType.toLowerCase() === "barracks" || troopType.toLowerCase() === "stable"){
            structOrTroop = "building";
        }
        //REALIZAR UN POST A CREATE TROOP
        let dosPiezasMismaPos = false;
        for (let piece of pieces){
            if (piece.troopOrBuilding.x === coordinates.x && piece.troopOrBuilding.y === coordinates.y){
                console.log('ya hay una pieza en esa posicion');
                let dosPiezasMismaPos = true;
                return;
            }
        }

        if (structOrTroop === "troop" && dosPiezasMismaPos === false){
            const createTroop = () => {
                let dataHealthStrengthValue;
                if (troopType.toLowerCase() === "archer"){
                    dataHealthStrengthValue = { "health": 10, "strength": 2, "value": 2 };
                }
                else if (troopType.toLowerCase() === "knight"){
                    dataHealthStrengthValue = { "health": 10, "strength": 3, "value": 3 };
                }
                else if (troopType.toLowerCase() === "soldier"){
                    dataHealthStrengthValue = { "health": 10, "strength": 1, "value": 1 };
                }
                const dataTroop = { "troopType": troopType, "playerId": 1,
                "gameId": jugadorActual.gameId,
                "xCoordinate": coordinates.x,
                "yCoordinate": coordinates.y,
                "health": dataHealthStrengthValue.health,
                "strength": dataHealthStrengthValue.strength,
                "value": dataHealthStrengthValue.value };
                
                axios.post(`https://my-game-deploy.onrender.com/troops/`, dataTroop)
                    .then(response => {
                        console.log(response.data);
                        if (structOrTroop === "troop"){
                            jugadorActual.createTroop(troopType, coordinates.x, coordinates.y);
                            pieces.push({troopOrBuilding: jugadorActual.troops[jugadorActual.troops.length-1]});
                            jugadorActual.troops[jugadorActual.troops.length-1].id = response.data.id;
                            jugadorActual.actionPoint -=1;
                            jugadorActual.gold -= dataHealthStrengthValue.value;
                        }
                    //restar el action point
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };
            createTroop();
        }
        else if (structOrTroop === "building" && dosPiezasMismaPos === false){
            const createBuilding = () => {
                let dataHealthValue;
                if (troopType.toLowerCase() === "archery"){
                    dataHealthValue = { "health": 10, "value": 2 };
                }
                else if (troopType.toLowerCase() === "barracks"){
                    dataHealthValue = { "health": 10, "value": 3 };
                }
                else if (troopType.toLowerCase() === "stable"){
                    dataHealthValue = { "health": 10, "value": 1 };
                }
                const dataBuilding = { "buildingType": troopType, "playerId": 1,
                "gameId": jugadorActual.gameId,
                "xCoordinate": coordinates.x,
                "yCoordinate": coordinates.y,
                "health": dataHealthValue.health,
                "value": dataHealthValue.value };
                
                axios.post(`https://my-game-deploy.onrender.com/buildings/`, dataBuilding)
                    .then(response => {
                        console.log(response.data);
                        if (structOrTroop === "building"){
                            jugadorActual.createBuilding(troopType, coordinates.x, coordinates.y);
                            pieces.push({troopOrBuilding: jugadorActual.buildings[jugadorActual.buildings.length-1]});
                            jugadorActual.actionPoint -=1;
                            jugadorActual.buildings[jugadorActual.buildings.length-1].id = response.data.id;
                            jugadorActual.gold -= dataHealthValue.value;
                        }
                    //restar el action point
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };
            createBuilding();
        
        }

        console.log(jugadorActual.buildings[jugadorActual.buildings.length-1], 'pieza creada');
    //   setSending(true);
    }
    function handleAttackDirectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setAttackDirection(event.target.value);
      }
    
    function handleSendAttack() {
        let jugadorActual = juego1.players[0];
        let gameActual = juego1;
        if (selectedPiece && jugadorActual.actionPoint >0){
            console.log('Enviar ataque:', attackDirection);
            console.log("ataque realizado por", selectedPiece);
            const sendAttack = () => {

                const data = { 
                     "method": 'attack',
                     "direction": attackDirection,
                     "gameId": selectedPiece.gameId,
                     'troopId': selectedPiece.id,
                    };
                //se maneja el de troops
                axios.patch(`https://my-game-deploy.onrender.com/troops`, data)
                    .then(response => {
                        console.log(response.data);
                        console.log(response.data.id, response.data.damage,"ATAQUE EJECUTADO CORRECTAMENTE");
                        jugadorActual.actionPoint -=1;
                        console.log(gameActual.players, "players game actual")
                        let instanciaPlayerAtacado = searchPlayerByTroopId(response.data.id, gameActual.players);
                        let instanciaTroopAtacado = searchTroopByTroopId(response.data.id, gameActual.players);
                        console.log(instanciaPlayerAtacado, instanciaTroopAtacado, "instancia player y troop atacado");
                        if (!response.data.alive){
                            instanciaTroopAtacado.health = 0;
                            for (let piece of pieces){
                                if (piece.troopOrBuilding.id === response.data.id){
                                    pieces.splice(pieces.indexOf(piece), 1); //se elimina
                                }
                            }
                        
                        }
                        else if(response.data.alive){
                            instanciaTroopAtacado.health -= response.data.damage;
                        }
                        
                    //restar el action point
                    })
                    .catch(error => {
                        console.error(error);
                        console.log("ERROR AL EJECUTAR ATAQUE");
                    });
            };
            // sendAttack();

            // Aquí puedes enviar los datos de ataque al backend

            // setAttackSending(true); !!!!!!!!!!!!!!!!!!!!!!!!!!!!bloquear envio de ataque
        }
    }



    function grabPiece(e: React.MouseEvent){
        const element = e.target as HTMLElement;
        const gameBoard = gameBoardRef.current;
        
        if (element.classList.contains("game-piece") && gameBoard) {
            const boardHeight = gameBoard.clientHeight;
            const y_fi = Math.floor((e.clientY - gameBoard.offsetTop) / 65);
            const invertedY = Math.floor((boardHeight / 65) - y_fi - 1);
            const gridX = Math.floor((e.clientX - gameBoard.offsetLeft) / 100);
            // const gridY = Math.abs(Math.ceil((e.clientY - gameBoard.offsetTop - 1000) / 65));
            const gridY = invertedY;
            setGridX(gridX);
            setGridY(gridY);
            xAnterior = gridX;
            yAnterior = gridY;
            for (let piece of pieces) {
                // Acceder a las propiedades 'x' e 'y' de cada 'piece'
                if (piece.troopOrBuilding.x === gridX && piece.troopOrBuilding.y === gridY) {
                    
                    piezaActual = piece;
                    
                    let playerSelect = searchPlayer(piece.troopOrBuilding.playerId, piece.troopOrBuilding.gameId, juego1.players);
                    console.log("playerSelect", playerSelect);
                    
                    //Si es building no se puede mover (es fijo)
                    console.log(piece.troopOrBuilding.type, "tipo de piezaAAAAAAAAAAAAAAAAAAAAAAAAA");
                    if (playerSelect.actionPoint <=1 || piece.troopOrBuilding.type === "archery" ||
                    piece.troopOrBuilding.type === "stable" || piece.troopOrBuilding.type === "barracks"){
                        movePie = false;
                    }
                    else{
                        movePie = true;
                    }
                }
            }
            console.log(gridX, gridY, 'AGARRAR pieza');
            if (movePie){
                setSelectedPiece(piezaActual.troopOrBuilding);
                const x = e.clientX - 50;
                const y = e.clientY - 50;
                element.style.position = "absolute";
                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
                activePiece = element;
            }
            

        }
    }
    
    function movePiece(e: React.MouseEvent){
        const gameBoard = gameBoardRef.current;

        if(activePiece && gameBoard && movePie){
            const minX = gameBoard.offsetLeft;
            const minY = gameBoard.offsetTop;
            const x = e.clientX-50 ;
            const y = e.clientY-50 ;
            const maxX = gameBoard.offsetLeft + gameBoard.clientWidth - 50;
            const maxY = gameBoard.offsetTop + gameBoard.clientHeight - 50;
            activePiece.style.position = "absolute";
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
            activePiece.style.width = "50px";
            activePiece.style.height = "50px";

            //si x es menor que el minX
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            }
            //Si x es mayor que maxX
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            }
            //Si x esta dentro de los limites
            else {
                activePiece.style.left = `${x}px`;
            }

            
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            }
           
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            }
         
            else {
                activePiece.style.top = `${y}px`;
            }
        }
        
    }
    function dropPiece(e: React.MouseEvent) {
        const gameBoard = gameBoardRef.current;
        if (activePiece && gameBoard && movePie) {

            const boardHeight = gameBoard.clientHeight;
            const y_fi = Math.floor((e.clientY - gameBoard.offsetTop) / 65);
            const invertedY = Math.floor((boardHeight / 65) - y_fi - 1);
            const x = Math.floor((e.clientX - gameBoard.offsetLeft) / 100);
            // const y = Math.floor((e.clientY - gameBoard.offsetTop) / 65);
            const y = invertedY;
            
            let movimientos = move(xAnterior, yAnterior, x, y);
            
            
            
            //identificar en que pieza estoy jugando
            
            console.log(piezaActual, "PIEZA ACTUAL");

            for (let i = 0; i < movimientos.length; i++) {
                console.log(movimientos[i], "MOVIMIENTO");
                
                let instancePlayerPlay = searchPlayer(piezaActual.troopOrBuilding.playerId, 
                    piezaActual.troopOrBuilding.gameId, juego1.players);
                console.log(instancePlayerPlay, "PLAYERRRRRRRRRRRRRRRRR");
                const sendData = () => {

                    const data = { 
                         "method": 'move',
                         "direction": movimientos[i],
                         "gameId": piezaActual.troopOrBuilding.gameId,
                         'troopId': piezaActual.troopOrBuilding.id,
                        };
                    
                    axios.patch(`https://my-game-deploy.onrender.com/troops`, data)
                        .then(response => {
                            console.log(response.data);
                            console.log("MOVIMIENTO EJECUTADO CORRECTAMENTE")
                            piezaActual.troopOrBuilding.mover(x, y);
                            
                        //restar el action point
                        })
                        .catch(error => {
                        console.error(error);
                        });
                    };
                console.log(instancePlayerPlay.actionPoint, "ACTION POINTS");
                if (instancePlayerPlay.actionPoint > 1){
                    sendData();
                    instancePlayerPlay.actionPoint -=1;
                }
                else{
                    // piezaActual.troopOrBuilding.x = xAnterior;
                    // piezaActual.troopOrBuilding.y = yAnterior;
                    console.log("no cuenta con suficientes puntos de accion")
                }
    
            }
            
            setPieces((value) => {
                const pieces = value.map((p) => {
                if (p.troopOrBuilding.x === gridX && p.troopOrBuilding.y === gridY) {
                    p.troopOrBuilding.x = x;
                    p.troopOrBuilding.y = y;
                    piezaActual = p;
                }
                return p;
                });
                return pieces;
            });
            activePiece = null;
            }
  }

    console.log(pieces);
    let i =  0;
    let tileNormal = new Vacio();
    for (let j = verticalAxis.length-1; j >=0; j--) {
        
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            let asign = false;
            let image = undefined;
            
            
            for (let piece of pieces) {
                

                // Acceder a las propiedades 'x' e 'y' de cada 'piece'
                if (piece.troopOrBuilding.x === i && piece.troopOrBuilding.y === j) {
                    board.push(<Tile key={`${i}-${j}`} troopOrBuilding = {piece.troopOrBuilding} />);
                    asign = true;
                }
                
            }
            if (asign!= true){
                board.push(<Tile key={`${i}-${j}`} troopOrBuilding = {tileNormal} />);
            }
        }
        
        
    }
    return <>
    
    <div onMouseMove={(e)=> movePiece(e)} onMouseDown={(e) => grabPiece(e)} onMouseUp={(e)=> dropPiece(e)} 
    id="completeBoard" ref={gameBoardRef}> {board} 
    </div>
    <div>
        <label htmlFor="troopType">Tipo de tropa:</label>
        <select id="troopType" name="troopType" value={troopType} onChange={handleTroopTypeChange}>
          <option value="">Seleccionar tipo de tropa o estructura</option>
          <option value="Archer">Archer</option>
          <option value="Knight">Knight</option>
          <option value="Soldier">Soldier</option>
          <option value="Archery">Archery</option>
          <option value="Stable">Stable</option>
          <option value="Barracks">Barracks</option>
        </select>
    </div>
    <div>
      <label htmlFor="x">Coordenada X:</label>
      <input type="number" id="x" name="x" value={coordinates.x} onChange={handleCoordinateChange} />
    </div>
    <div>
      <label htmlFor="y">Coordenada Y:</label>
      <input type="number" id="y" name="y" value={coordinates.y} onChange={handleCoordinateChange} />
    </div>
    
    <button onClick={handleSendData} disabled={sending}>
      Crear
    </button>
    <div>
        <label htmlFor="attack-direction">Attack Direction:</label>
        <select id="attack-direction" value={attackDirection} onChange={handleAttackDirectionChange}>
          <option value="">Select an option</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
        <button onClick={handleSendAttack} disabled={attackSending}>
          Send Attack
        </button>
    </div>
    
    {/* <Estadisticas gold={p1.gold} pointAction={p1.actionPoint} gameId ={p1.gameId} playerId={p1.id} />     */}
    
    

    </>
}

export default Boards;