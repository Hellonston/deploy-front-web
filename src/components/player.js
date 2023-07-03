import {Archer, Knight, Soldier} from "./troop.js";
import { Barracks, Stable, Archery } from "./building.js";
class Player {
    static lastId = 0;
    constructor(name, urbanCenter) { 
        this.name = name;
        this.id = Player.getNextId();
        this.gameId = null; //al inicio, cuando todavia no ingresa a un juego no tiene gameId asignada
        this.gold = 1000;
        this.actionPoint = 7;
        this.archersQuantity = 0;
        this.knightsQuantity = 0;
        this.soldiersQuantity = 0;
        this.urbanCenter = urbanCenter;
        this.barracksQuantity = 0;
        this.stableQuantity = 0;
        this.archeryQuantity = 0;
        this.troops = []; //almacena instancias de archer, knight o soldier
        this.buildings = []; //almacena instancias de barrack, stable o archery
    }
    static getNextId() {
        Player.lastId++;
        return Player.lastId;
      }   
    //troop debe ser una instancia de archer, knight o soldier

    createTroop(troop, x, y) {
        
        if (troop.toLowerCase() === "archer") {
            
            let archer = new Archer("archer", this.id, this.gameId, x, y, 10, 2, 2);
            this.addTroop(archer);
        }
        else if (troop.toLowerCase() === "knight") {
            let knight = new Knight("knight", this.id, this.gameId, x, y, 10, 3, 3);
            this.addTroop(knight);
        }
        else if (troop.toLowerCase() === "soldier") {
            let soldier = new Soldier("soldier", this.id, this.gameId, x, y, 10, 1, 1);
            this.addTroop(soldier);
        }
    }
    createBuilding(building, x, y) {
        if (building.toLowerCase() === "barracks") {
            let barrack = new Barracks(this.id,this.gameId, x, y, 10, 2);
            this.addBuilding(barrack);
        }
        else if(building.toLowerCase() === "stable") {
            let stable = new Stable(this.id, this.gameId, x, y, 10, 3);
            this.addBuilding(stable);
        }
        else if(building.toLowerCase() === "archery") {
            let archery = new Archery(this.id, this.gameId, x, y, 10, 1);
            this.addBuilding(archery);
        }
    }
    addTroop(troop) { 
        this.troops.push(troop);
    }

    //building debe ser una instancia de barrack, stable o archery
    addBuilding(building) {
        this.buildings.push(building);
    }





}





export {Player};