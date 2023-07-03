import React from 'react';

const Estadisticas = ({ gold, pointAction, gameId, playerId}) => {
  return (
    <div className="estadisticas">
      <h2 className="titulo">Estadísticas</h2>
      <div className="dato">
        <span className="etiqueta">oro:</span>
        <span className="valor">{gold}</span>
      </div>
      <div className="dato">
        <span className="etiqueta">Puntos de acción restantes:</span>
        <span className="valor">{pointAction}</span>
      </div>
      <div className="dato">
        <span className="etiqueta">gameId:</span>
        <span className="valor">{gameId}</span>
      </div>
      <div className="dato">
        <span className="etiqueta">id del jugador principal:</span>
        <span className="valor">{playerId}</span>
      </div>
      
    </div>
  );
};

export {Estadisticas};