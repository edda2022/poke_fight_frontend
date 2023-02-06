import { useNavigate } from "react-router-dom";
export default function Fightresult({
  playerA,
  playerB,
  setPlayerB,
  scorePlayerA,
  scorePlayerB,
  capitalizeFirstLetter
}) {
  const navigate = useNavigate();

  const playAgain = () => {
    setPlayerB("");
    navigate("/pokefight");
  };

  return (
    <>
      <div className="fightresult">
        <div>{playerA && (
          <div >
            <p className="fightresulttext text-center" >
            {" "}
            {capitalizeFirstLetter(playerA)} has won! </p>
           <p className="fightresulttext text-center"> Your Score: {scorePlayerA}</p>
          </div>
           )}
        {playerB &&
         <p className="fightresulttext"> GAME OVER! {capitalizeFirstLetter(playerB)} has won!</p>}
        </div>
      </div>
      <div>
          <button
            className="btn btn-m btn-secondary btn-outline-warning selectbtns"
            onClick={playAgain}
          >
            Play again!
          </button>
        </div>
    </>
  );
}
