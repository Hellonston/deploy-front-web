class Building {
    static lastId = 0;
    constructor(playerId, gameId, x, y, health, value) {
        this.id = Building.getNextId();
        this.playerId = playerId;
        this.gameId = gameId;
        this.x = x;
        this.y = y;
        this.health = health;
        this.value = value;
        this.image = null;
        this.vivo = true;
        this.type = "building";
    }
    static getNextId() {
        Building.lastId++;
        return Building.lastId;
    }   
    // perderVida(damage) { 
    //     this.health -= damage;
    //     console.log(`El edificio ${this.buildingType} perdió ${damage} puntos de vida. Vida restante: ${this.health}`);

    //     if (this.health <= 0) {
    //         console.log(`El edificio ${this.buildingType} murió.`);
    //         this.image = null;
    //         this.vivo = false;
    //     }
    // }

}

class Archery extends Building {
    constructor(playerId, gameId, x, y, health, value) {
      super(playerId, gameId, x, y, health, value);
      this.image = '../../../src/assets/Estructuras/cuartel_arquero_seg.png';
      this.type = "archery";
    }
  }
class Stable extends Building {
    constructor(playerId, gameId, x, y, health, value) {
        super(playerId, gameId, x, y, health, value);
        this.image = '../../../src/assets/Estructuras/establo_seg.png';
        this.type = "stable";
    }
}

class Barracks extends Building { 
    constructor(playerId, gameId, x, y, health, value) {
        super(playerId, gameId, x, y, health, value);
        this.image = '../../../src/assets/Estructuras/cuartel_milicia_seg.png';
        this.type = "barracks";
    }
}
export {Building, Archery, Stable, Barracks};