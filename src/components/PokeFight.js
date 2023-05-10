import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

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
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://backend-heci.onrender.com/pokemon/${playerA}`)
      .then((response) => {
        setFirstPokemon(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(firstPokemon);
  useEffect(() => {
    axios
      .get(`https://backend-heci.onrender.com/pokemon/${playerB}`)
      .then((response) => {
        setSecondPokemon(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const randomIndex = () => {
    Math.floor(Math.random() * 6);
  };

  const fight = () => {
    // random field to compare in Stats
    const randomIndex = (i) => {
      return Math.floor(Math.random() * 6);
    };
    const index = randomIndex();
    console.log(firstPokemon.stats[index].base_stat);
    if (playerA && playerB) {
      if (
        firstPokemon.stats[index].base_stat >
        secondPokemon.stats[index].base_stat
      ) {
        setScorePlayerA(scorePlayerA + 1);
        if (scorePlayerA === 2) {
          axios
            .post("https://backend-heci.onrender.com/fightresult", {
              id_PlayerA: `${firstPokemon.id}`,
              pokemon_name_playerA: `${firstPokemon.name}`,
              score_PlayerA: 3,
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("nothing to put in db, no 3 points");
        }

        setPlayerB("");
        navigate("/pokefight/fightresult");
      } else if (
        firstPokemon.stats[index].base_stat <
        secondPokemon.stats[index].base_stat
      ) {
        setScorePlayerB(scorePlayerB + 1);
        setPlayerA("");
        navigate("/pokefight/fightresult");
      } else {
        alert("no one won");
        navigate("/pokefight/fightresult");
      }
    } else {
      alert("Please choose 2 Pokemons");
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
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <h2 className="justify-content-center align-items-center">
          Fight Arena - select 2 Pokémons
        </h2>
      </div>

      <div className="gamedescription">
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="pokefight-description"
          aria-expanded={open}
          className="btn-outline-secondary btn btn-light btn-sm playagainbutton"
        >
          How to play
        </Button>
        <Collapse in={open}>
          <div id="pokefight-description">
            <p>
              1. Choose your favorite Pokémon as the active player <br></br>
              2. Choose the Pokémon to fight against <br></br>
              3. Fight! <br></br>
            </p>
            <p>
              The algorithm will decide about the stat used for the battle.{" "}
              <br></br>
              The higher stat wins. <br></br>
              So, choose your active Pokémon wisely.<br></br>
              <br></br>
              If you win 3 battles in a row, you won the game.<br></br>
              If you loose a battle, you loose the game.<br></br>
            </p>
          </div>
        </Collapse>
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
