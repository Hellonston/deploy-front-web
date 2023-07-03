import React from 'react';

function LeaderboardItem({ rank, name, score }) {
  return (
    <li>
      <span className="rank">{rank}</span>
      <span className="name">{name}</span>
      <span className="score">{score}</span>
    </li>
  );
}

export default LeaderboardItem;
