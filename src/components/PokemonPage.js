import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PokemonPage({
  capitalizeFirstLetter,
  setPlayerA,
  setPlayerB,
  playerA,
  playerB,
}) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const [pokemonDetail, setPokemonDetail] = useState({
    sprites: {
      front_default: "",
    },
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8082/pokemon/${name}`)
      .then((response) => {
        setPokemonDetail(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const clickPlayerA = (e) => {
    setPlayerA(e.target.value);
  };

  const clickPlayerB = (e) => {
    if (playerA === e.target.value) {
      alert("You can't play against yourself. Please choose another Pokémon!");
    } else {
      setPlayerB(e.target.value);
    }
  };

  const resetGame = () => {
    setPlayerA("");
    setPlayerB("");
  };
  return (
    <>
      <div className="card pokemoncarddiv mx-auto">
        <div className="row g-2 mb-4 pokemoncard  ">
          <div className="col-md-4">
            <img
              src={pokemonDetail.sprites.front_default}
              className="img-fluid rounded-start pokepicPokepage"
              alt={capitalizeFirstLetter(name)}
            ></img>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">
                      {capitalizeFirstLetter(pokemonDetail.name)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">National Pokedex Number</th>
                    <td>{pokemonDetail.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Height</th>
                    <td>{pokemonDetail.height}</td>
                  </tr>
                  <tr>
                    <th scope="row">Weight</th>
                    <td>{pokemonDetail.weight}</td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Statistics:</th>
                    <td></td>
                  </tr>
                  {pokemonDetail.stats?.map((stat, index) => {
                    return (
                      <tr>
                        <th scope="row">
                          {capitalizeFirstLetter(stat.stat.name)}
                        </th>
                        <td>{stat.base_stat}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <div>
                <Link to={`/pokemon/${pokemonDetail.name}/types`}>
                  <button className="btn-outline-secondary btn btn-light btn-sm pokemonbutton mb-3 ">
                    View Types
                  </button>
                </Link>
              </div>
              {playerA === "" && (
                <div>
                  <Link to={`/pokefight`}>
                    <button
                      onClick={clickPlayerA}
                      value={pokemonDetail.name}
                      className="btn-outline-secondary btn btn-light btn-sm mb-3"
                    >
                      Select {capitalizeFirstLetter(pokemonDetail.name)} as YOUR
                      Pokémon
                    </button>
                  </Link>
                </div>
              )}

              {playerA !== "" && playerB === "" && (
                <div>
                  <Link to={`/pokefight`}>
                    <button
                      onClick={clickPlayerB}
                      value={pokemonDetail.name}
                      className="btn-outline-secondary btn btn-light btn-sm"
                    >
                      Select {pokemonDetail.name} for fight player 2
                    </button>
                  </Link>
                </div>
              )}
              <button
                className="btn btn-m btn-secondary btn-outline-warning"
                onClick={resetGame}
              >
                Reset game
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="backbuttondiv">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn btn-lg btn-secondary btn-outline-warning"
        >
          Go back to overview
        </button>
      </div>
    </>
  );
}
