import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PokeFight({
  capitalizeFirstLetter,
  playerA,
  playerB,
  setPlayerA,
  setPlayerB,
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
    console.log("fight");
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
          Here are the 2 Pokémons fighting against each other
        </h2>
      </div>
      <div className="pokefight">
        <div className="card playerA">
          <img
            src={firstPokemon.sprites?.front_default}
            className="img-fluid rounded-start"
            alt={capitalizeFirstLetter(playerA)}
          ></img>
          <div className="card-body">
            <h5 className="card-title">{capitalizeFirstLetter(playerA)}</h5>
            {/* <p className="card-text">{firstPokemon.name}</p> */}
            {playerA === "" && (
              <div className="">
                <Link to={`/pokemon`}>
                  <button className="btn-outline-secondary btn btn-warning btn-sm mb-3">
                    Choose First Player
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="card playerB">
          <img
            src={secondPokemon.sprites?.front_default}
            className="img-fluid rounded-start"
            alt={secondPokemon.name}
          ></img>
          <div className="card-body">
            <h5 className="card-title">{capitalizeFirstLetter(playerB)}</h5>
            {/* <p className="card-text">{secondPokemon.name}</p> */}
            {playerB === "" && (
              <div>
                <Link to={`/pokemon`}>
                  <button className="btn-outline-secondary btn btn-warning btn-sm">
                    Choose Second Player
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={fight}
        type="button"
        className="btn btn-danger btn-lg mb-3"
      >
        FIGHT!
      </button>
      <button
        className="btn-outline-secondary btn btn-light btn-sm"
        onClick={resetGameBtn}
      >
        Play Again!
      </button>
    </>
  );
}
