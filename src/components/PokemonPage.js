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
      .get(`https://backend-heci.onrender.com/pokemon/${name}`)
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
              alt={`Picture of ${capitalizeFirstLetter(name)}`}
            ></img>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <table className="table">
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
                </tbody>
              </table>
              <br></br>
              <br></br>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <th scope="row">Statistics</th>
                    <td></td>
                  </tr> */}

                  {pokemonDetail.stats?.map((stat, index) => {
                    return (
                      <tr key={stat.stat.name}>
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
                <Link
                  to={`/pokemon/${pokemonDetail.name}/types`}
                  target="_blank"
                >
                  <button className="btn btn-m btn-secondary btn-outline-warning selectbtns">
                    View types
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-up-right ms-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
              {playerA === "" && (
                <div>
                  <Link to={`/pokefight`}>
                    <button
                      onClick={clickPlayerA}
                      value={pokemonDetail.name}
                      className="btn btn-m btn-secondary btn-outline-warning selectbtns"
                    >
                      Select {capitalizeFirstLetter(pokemonDetail.name)} as your
                      Pokémon
                    </button>
                  </Link>
                </div>
              )}

              {playerA !== "" && playerB === "" && (
                <div>
                  <Link to={`/pokefight`}>
                    <button
                      className="btn btn-m btn-secondary btn-outline-warning selectbtns"
                      onClick={clickPlayerB}
                      value={pokemonDetail.name}
                    >
                      Select {capitalizeFirstLetter(pokemonDetail.name)} to
                      fight against
                    </button>
                  </Link>
                </div>
              )}
              <div>
                <button
                  className="btn btn-m btn-secondary btn-outline-warning selectbtns"
                  onClick={resetGame}
                >
                  Reset game
                </button>
              </div>
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
