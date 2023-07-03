import React from 'react';
import LeaderboardItem from './LeaderBoardItem';
import '../LeaderBoards.css'
function Leaderboard({ data }) {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {data.map((player, index) => (
          <LeaderboardItem key={index} {...player} />
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
