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

  const [scorePlayerA, setScorePlayerA] = useState(0);
  const [scorePlayerB, setScorePlayerB] = useState(0);


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
    if (firstPokemon.weight > secondPokemon.weight) {
      setScorePlayerA(scorePlayerA+1);
    } else if (firstPokemon.weight < secondPokemon.weight) {
      setScorePlayerB(scorePlayerB+1);
    } else {
      alert('no one won')
    }
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
        <h5 className="card-title">{capitalizeFirstLetter(playerA)}</h5>
          <img
            src={firstPokemon.sprites?.front_default}
            className="img-fluid rounded-start"
            alt={capitalizeFirstLetter(playerA)}
          ></img>
          <div className="card-body">
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
          <div className={`fightdetails ${playerA ? "" : "disabled"}`}>
          <div>Height: {firstPokemon.height}</div>
          <div>Weight: {firstPokemon.weight}</div>
          <div>Stats: {firstPokemon.stats?.map((stat, index) => {
                    return (
                      <div key={stat.stat.url}>
                        {capitalizeFirstLetter(stat.stat.name)}:{" "}
                        {stat.base_stat}
                      </div>
                    );
                  })}
                  
          </div>
          <div>Types: {firstPokemon.types?.map((type) => {
                    return (
                      <div key={type.slot}>
                        {type.type.name}
                      </div>
                    );
                  })}

          </div>
          <div className="score">
            score={scorePlayerA}
          </div>
          </div>
        </div>

        <div className="card playerB">
        <h5 className="card-title">{capitalizeFirstLetter(playerB)}</h5>
          <img
            src={secondPokemon.sprites?.front_default}
            className="img-fluid rounded-start"
            alt={secondPokemon.name}
          ></img>
          <div className="card-body">
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
          <div className={`fightdetails ${playerA ? "" : "disabled"}`}>
          <div>Height: {secondPokemon.height}</div>
          <div>Weight: {secondPokemon.weight}</div>
          <div>Stats: {secondPokemon.stats?.map((stat, index) => {
                    return (
                      <div key={stat.stat.url}>
                        {capitalizeFirstLetter(stat.stat.name)}:{" "}
                        {stat.base_stat}
                      </div>
                    );
                  })}
                  
          </div>
          <div>Types: {secondPokemon.types?.map((type) => {
                    return (
                      <div key={type.slot}>
                        {type.type.name}
                      </div>
                    );
                  })}

          </div>
          <div className="score">
            score={scorePlayerB}
          </div>
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
        Play Again!
      </button>
      </div> 
    </>
  );
}
