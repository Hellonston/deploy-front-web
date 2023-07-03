import axios from "axios";
import { json } from "react-router";



function searchPlayer(playerId, gameId, players){
    for (let player of players){
        if (player.id == playerId && player.gameId == gameId){
            return player;
        }
    }
}
function searchPlayerByTroopId(troopId, players){
    players.forEach(player => {
        player.troops.forEach(troop => {
            if (troop.id == troopId){
                console.log(player);
                return player;
            }
        });
    });
}
function searchTroopByTroopId(troopId, players){
    players.forEach(player => {
        player.troops.forEach(troop => {
            if (troop.id == troopId){
                return troop;
            }
        });
    });
}


async function updatePlayersMap(game) {
    try {
        const response = await axios({
            url: 'https://my-game-deploy.onrender.com/players/showAll',
            method: 'get',
        });
        console.log("Se obtienen todos los jugadores");
        const jsonAllPlayers = response.data;
        console.log(jsonAllPlayers, "JUGADORES");
        Object.keys(jsonAllPlayers).forEach(key => {
            const value = jsonAllPlayers[key];
            console.log(`Value: ${value.gameId}`);
            if (value.gameId == game.id){
                let jugadorBuscado;
                //Se crean los jugadores correspondientes
                let existeJugador = false;
                game.players.forEach(player => {
                    if (player.id == value.id){
                        existeJugador = true;
                        let jugadorBuscado = player;
                    
                        
                    }


                });
                if (!existeJugador){
                    console.log("GAME: JUGADOR NO EXISTE, SE CREA");
                    game.createPlayer(value.name, 0);
                    game.players[game.players.length-1].id = value.id;
                    game.players[game.players.length-1].gold = value.gold;
                    game.players[game.players.length-1].actionPoint = value.actionPoint;
                    game.players[game.players.length-1].name = value.name
                }
                else if(existeJugador){
                    jugadorBuscado.id = value.id;
                    jugadorBuscado.gold = value.gold;
                    jugadorBuscado.actionPoint = value.actionPoint;
                    jugadorBuscado.name = value.name;
                    console.log("GAME: JUGADOR ACTUALIZADO!!!");
                    
                };

                
            }
        });
        // Resto del código que depende de jsonAllPlayers
        
        } catch (error) {
            console.error(error);
            console.log("Error al realizar consulta");
        }
    }



async function updateTroopsMap(game) {
    try {
        const response = await axios({
            url: 'https://my-game-deploy.onrender.com/troops/showAll',
            method: 'get',
        });
      
      
        console.log("Se obtienen todas las tropas");
        const jsonAllTroops = response.data;
        console.log(jsonAllTroops, "TROPAS");
        
        Object.keys(jsonAllTroops).forEach(key => {
            const value = jsonAllTroops[key];
            
            if (value.gameId == game.id){
                console.log("misma id", game.players);
                let tropaExiste = false;
                let tropaActual;
                game.players.forEach(player => {
                    //ver dps
                    if (player.id == value.playerId){
                        player.troops.forEach(troop => {
                            if (troop.id == value.id){
                                tropaExiste = true;
                                tropaActual = troop;

                            }
                        });
                        if (!tropaExiste){
                            player.createTroop(value.troopType, value.xCoordinate, value.yCoordinate);
                            player.troops[player.troops.length-1].id = value.id;
                            console.log("unidad creada");
                        }
                        else if(tropaExiste){
                            tropaActual.id = value.id;
                            tropaActual.xCoordinate = value.xCoordinate;
                            tropaActual.yCoordinate = value.yCoordinate;
                            tropaActual.health = value.health;
                            console.log("unidad actualizada");
                        }
                        
                        //Se crean las tropas correspondientes
        
                    }
                });
                
            }
        });
        
        // Resto del código que depende de jsonAllTroops
        
        } catch (error) {
        console.error(error);
        console.log("Error al realizar consulta");
        }
  }
  
async function updateBuildingsMap(game) {
    try {
        const response = await axios({
            url: 'https://my-game-deploy.onrender.com/buildings/showAll',
            method: 'get',
        });
        console.log("Se obtienen todos los edificios");
        const jsonAllBuildings = response.data;
        
        Object.keys(jsonAllBuildings).forEach(key => {
            const value = jsonAllBuildings[key];
            console.log(`Value: ${value.gameId}`);
            if (value.gameId == game.id){
                let estructuraExiste = false;
                let estructuraActual;
                game.players.forEach(player => {
                    if (player.id == value.playerId){
                        player.buildings.forEach(building => {
                            if (building.id == value.id){
                                estructuraExiste = true;
                                estructuraActual = building;
                                
                            }
                        });
                        if (!estructuraExiste){
                            player.createBuilding(value.buildingType, value.xCoordinate, value.yCoordinate);
                            console.log()
                            // player.buildings[player.buildings.length-1].id = value.id;
                        }
                        else if(estructuraExiste){

                            estructuraActual.id = value.id;
                            estructuraActual.xCoordinate = value.xCoordinate;
                            estructuraActual.yCoordinate = value.yCoordinate;
                            estructuraActual.health = value.health;
                            console.log("Estructura actualizada");
                        }
                    }

                });
                // for (let player in game.players){
                //     if (player.id == value.playerId){
                //         //Se crean los edificios correspondientes
                //         player.createBuilding(value.buildingType, value.xCoordinate, value.yCoordinate);
                //         player.buildings[player.buildings.length-1].id = value.id;
                //     }
                // }
            }
        });
        
        // Resto del código que depende de jsonAllBuildings
        
        } catch (error) {
            console.error(error);
            console.log("Error al realizar consulta");
        
        }
    }
async function updateMap(game) {
    try{
        await updatePlayersMap(game);
        await updateTroopsMap(game);
        await updateBuildingsMap(game);
    } catch(error){
        console.error(error);
        console.log("Error al realizar consulta");
    }
}
// let jsonTroops = updateMap(1);
// console.log(jsonTroops);
export {searchPlayer, updateMap, updateTroopsMap, updateBuildingsMap, updatePlayersMap,
searchPlayerByTroopId, searchTroopByTroopId};