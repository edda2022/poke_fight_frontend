import { useNavigate } from "react-router-dom";
export default function Fightresult({
  playerA,
  playerB,
  setPlayerB,
  scorePlayerA,
  scorePlayerB,
}) {
  const navigate = useNavigate();

  const playAgain = () => {
    setPlayerB("");
    navigate("/pokefight");
  };

  return (
    <>
      <div>
        {playerA && (
          <div>
            {" "}
            {playerA} has won! Your Score:{scorePlayerA}
          </div>
        )}
        {playerB && <div> GAME OVER! {playerB} has won!</div>}
        <div>
          <button
            className="btn-outline-secondary btn btn-light btn-sm playagainbutton"
            onClick={playAgain}
          >
            Play Again!
          </button>
        </div>
      </div>
    </>
  );
}
