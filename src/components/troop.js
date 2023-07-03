
class Troop{
    static lastId = 0;
    constructor(id, playerId, gameId, x, y, health, strength, value){
        this.id = Troop.getNextId();
        this.playerId = playerId;
        this.gameId = gameId;
        this.x = x;
        this.y = y;
        this.health = health;
        this.strength = strength;
        this.value = value;
        this.image = null;
        this.vivo = true;
        this.type = "troop";
    }
    static getNextId() {
        Troop.lastId++;
        return Troop.lastId;
    }
    mover(x, y) {
        this.x = x;
        this.y = y;
        console.log(`La tropa ${this.id}, asociado al jugador ${this.playerId}, del juego: ${this.gameId}
         se movió a la posición (${this.x}, ${this.y}).`);
      }
    perderVida(damage) {
        this.health -= damage;
        console.log(`La tropa ${this.name} perdió ${damage} puntos de vida. Vida restante: ${this.health}`);

        if (this.health <= 0) {
          console.log(`La tropa ${this.name} murió.`);
          this.image = null;
          this.vivo = false;

        }
      }
    
}
class Vacio{
    constructor(){
        this.image = null;
    }
}

class Archer extends Troop {
    constructor(name, playerId, gameId, x, y, health, strength, value) {
      super(name, playerId, gameId, x, y, health, strength, value);
      this.range = 2;
      this.image = "../../../src/assets/Tropas/icono_arquero_seg.png";
    }


    
  
    // Métodos específicos del arquero
    
  }

class Knight extends Troop{
    constructor(name, playerId, gameId, x, y, health, strength, value){
        super(name, playerId, gameId, x, y, health, strength, value);
        this.range = 1;
        this.image = "../../../src/assets/Tropas/icono_caballero_seg.png";
    }

}

class Soldier extends Troop{
    constructor(name, playerId, gameId, x, y, health, strength, value){
        super(name, playerId, gameId, x, y, health, strength, value);
        this.range = 1;
        this.image = "../../../src/assets/Tropas/icono_tropa_seg.png";
    }
}




export {Troop, Archer, Knight, Soldier, Vacio};