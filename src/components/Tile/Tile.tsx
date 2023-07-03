import React from "react";
import "./Tile.css";
import { Troop, Vacio } from "../troop";
import { Building } from "../building";

interface Props {
    troopOrBuilding: Troop | Building | Vacio;
    
}

function Tile({troopOrBuilding}: Props) {
    return (
        <div className="tile">
            {troopOrBuilding.image && <div style={{backgroundImage: `url(${troopOrBuilding.image})`}} className="game-piece"> </div>}
            
        </div>
    );
}
export default Tile;