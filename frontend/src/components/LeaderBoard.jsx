import axios from "axios";
import { useEffect, useState } from "react";
import { leaderBoard } from "../services/api"

function LeaderBoard() {
  const [bestScore, setBestScore] = useState([]);

  const fetchBestScores = async () => {
    try {
     const results = await leaderBoard()
     console.log(results, "Testing leaderboard");
     if (Array.isArray(results)) {
        setBestScore(results);
      } else {
        console.error("Leaderboard data is not in the expected format:", results);
      }
    } catch (error) {
      console.error("Error fetching best scores:", error);
    }
  };

  useEffect(() => {
    fetchBestScores();
  }, []); 

  return (
    <>
      <div>
        <h2>Score Board</h2>
        <div>
          <h3>Top 10 Players</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {bestScore.map((player, index) => (
                <tr key={index}>
                  <td>{player.username}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LeaderBoard;
