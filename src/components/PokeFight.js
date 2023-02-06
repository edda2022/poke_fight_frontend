import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function PokeFight({
  capitalizeFirstLetter,
  playerA,
  playerB,
  setPlayerA,
  setPlayerB,
  scorePlayerA,
  scorePlayerB,
  setScorePlayerA,
  setScorePlayerB,
}) {
  const [firstPokemon, setFirstPokemon] = useState({
    sprites: {
      front_default: "",
    },
  });
  const [secondPokemon, setSecondPokemon] = useState({
    sprites: {
      front_default: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/pokemon/${playerA}`)
      .then((response) => {
        setFirstPokemon(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/pokemon/${playerB}`)
      .then((response) => {
        setSecondPokemon(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fight = () => {
    if (playerA && playerB) {
      if (firstPokemon.weight > secondPokemon.weight) {
        setScorePlayerA(scorePlayerA + 1);
        setPlayerB("");
        axios.post('http://localhost:8082/fightresult', {
          id_PlayerA: `${firstPokemon.id}`,
          pokemon_name_playerA: `${firstPokemon.name}`,
          id_PlayerB: `${secondPokemon.id}`,
          pokemon_name_playerB: `${secondPokemon.name}`,
          score_PlayerA: 1,
          score_PlayerB: 0
        })
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        });
        navigate("/pokefight/fightresult");
      } else if (firstPokemon.weight < secondPokemon.weight) {
        setScorePlayerB(scorePlayerB + 1);
        setPlayerA("");
        axios.post('http://localhost:8082/fightresult', {
          id_PlayerA: `${firstPokemon.id}`,
          pokemon_name_playerA: `${firstPokemon.name}`,
          id_PlayerB: `${secondPokemon.id}`,
          pokemon_name_playerB: `${secondPokemon.name}`,
          score_PlayerA: 0,
          score_PlayerB: 1
        })
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        });
        navigate("/pokefight/fightresult");
      } else {
        alert("no one won");
        navigate("/pokefight/fightresult");
      }
    } else {
      alert("Please choose 2 Pokemons");
    };

   

  };
  const resetGameBtn = () => {
    setFirstPokemon("");
    setSecondPokemon("");
    setPlayerA("");
    setPlayerB("");
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="justify-content-center align-items-center">
      Fight Arena - select 2 Pokémons 
        </h2>
      </div>
      <div className="pokefight">
        <div className="card playerA">
          <h5 className="card-title">{capitalizeFirstLetter(playerA)}</h5>
          <img
            src={firstPokemon.sprites?.front_default}
            className="img-fluid rounded-start pokefight-img"
            alt={capitalizeFirstLetter(playerA)}
          ></img>
          <div className="card-body">
            {/* <p className="card-text">{firstPokemon.name}</p> */}
            {playerA === "" && (
              <div className="">
                <Link to={`/pokemon`}>
                  <button className="btn-outline-secondary btn btn-warning btn-sm mb-3">
                    Choose your Pokémon to fight with
                  </button>
                </Link>
              </div>
            )}
                      </div>
        </div>

        <div className="card playerB">
          <h5 className="card-title">{capitalizeFirstLetter(playerB)}</h5>
          <img
            src={secondPokemon.sprites?.front_default}
            className="img-fluid rounded-start pokefight-img"
            alt={secondPokemon.name}
          ></img>
          <div className="card-body">
            {/* <p className="card-text">{secondPokemon.name}</p> */}
            {playerB === "" && (
              <div>
                <Link to={`/pokemon`}>
                  <button className="btn-outline-secondary btn btn-warning btn-sm">
                  Choose the Pokémon to fight against
                  </button>
                </Link>
              </div>
            )}
          </div>
         
        </div>
      </div>
      <div className="buttongroupfight">
        <button
          onClick={fight}
          type="button"
          className="btn btn-danger btn-lg mb-3 fightbutton"
        >
          FIGHT!
        </button>

        <button
          className="btn-outline-secondary btn btn-light btn-sm playagainbutton"
          onClick={resetGameBtn}
        >
          Reset both Pokémons
        </button>
      </div>
    </>
  );
}
