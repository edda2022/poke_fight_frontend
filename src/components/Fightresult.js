import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Fightresult({
  playerA,
  playerB,
  setPlayerB,
  scorePlayerA,
  scorePlayerB,
  capitalizeFirstLetter
}) {
  const navigate = useNavigate();
  console.log(playerA)
  console.log(playerB)

  useEffect(() => {
    axios
      .post('http://localhost:8082/fightresult', {
        id_PlayerA: "1",
        pokemon_name_playerA: `${playerA}`,
        id_PlayerB: "3",
        pokemon_name_playerB: `${playerB}`,
        score_PlayerA: `${scorePlayerA}`,
        score_PlayerB: `${scorePlayerB}`
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
