import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Fightresult({
  playerA,
  playerB,
  setPlayerB,
  setPlayerA,
  scorePlayerA,
  scorePlayerB,
  setScorePlayerA,
  setScorePlayerB,
  capitalizeFirstLetter,
}) {
  const navigate = useNavigate();

  const playAgain = () => {
    setPlayerB("");
    navigate("/pokefight");
  };

  const newGame = () => {
    setPlayerA("");
    setPlayerB("");
    setScorePlayerA(0);
    setScorePlayerB(0);
    navigate("/pokefight");
  };

  return (
    <>
      <div className="fightresult mt-5">
        <div>
          {playerA && (
            <div>
              <p className="fightresulttext text-center">
                {" "}
                {capitalizeFirstLetter(playerA)} has won!{" "}
              </p>
              <p className="fightresulttext text-center">
                {" "}
                Your personal score in this session: {scorePlayerA}/3
              </p>
            </div>
          )}
          {playerB && (
            <p className="fightresulttext">
              {" "}
              GAME OVER! {capitalizeFirstLetter(playerB)} has won!
            </p>
          )}
        </div>

        <div>
          {scorePlayerA < 3 && (
            <button
              className="btn btn-m btn-secondary btn-outline-warning selectbtns"
              onClick={playAgain}
            >
              Play again!
            </button>
          )}
        </div>
        <div>
          {scorePlayerA > 3 && (
            <button
              className="btn btn-m btn-secondary btn-outline-warning selectbtns text-center"
              onClick={newGame}
            >
              New Game
            </button>
          )}
        </div>
      </div>
    </>
  );
}
