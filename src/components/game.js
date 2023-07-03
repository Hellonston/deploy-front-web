import {Player} from './player.js';
class Game{
    static lastId = 0;
    constructor(turn, map){
        this.turn = turn;
        this.id = Game.getNextId();
        this.player1 = null;
        this.player2 = null;
        this.player3 = null;
        this.player4 = null;
        this.map = map;
        this.players = [];
    }
    static getNextId() {
        Game.lastId++;
        return Game.lastId;
      }  
    createPlayer(name, urbanCenter){
        let player = new Player(name, urbanCenter);
        this.addPlayer(player);
    }

    addPlayer(player){
        if(this.player1 == null){
            this.player1 = player;
            player.gameId = this.id;
            this.players.push(player);
        }else if(this.player2 == null){
            this.player2 = player;
            player.gameId = this.id;
            this.players.push(player);
        }else if(this.player3 == null){
            this.player3 = player;
            player.gameId = this.id;
            this.players.push(player);
        }else if(this.player4 == null){
            this.player4 = player;
            player.gameId = this.id;
            this.players.push(player);
        }else{
            console.log("No hay espacio para más jugadores");
        }
    }
}


export {Game};