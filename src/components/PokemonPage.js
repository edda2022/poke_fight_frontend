import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PokemonPage({ capitalizeFirstLetter }) {
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
  return (
    <>
      <div className="card w-50 pokemoncarddiv mx-auto">
        <div className="row g-2 mb-4 pokemoncard  ">
          <div className="col-md-3">
            <img
              src={pokemonDetail.sprites.front_default}
              className="img-fluid rounded-start"
              alt={capitalizeFirstLetter(name)}
            ></img>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h3 className="card-title mb-4">{capitalizeFirstLetter(name)}</h3>
              <p>Name: {capitalizeFirstLetter(pokemonDetail.name)}</p>
              <p>National Pokedex Number: {pokemonDetail.id}</p>
              <p className="card-text">Height: {pokemonDetail.height}</p>
              <p className="card-text">Weight: {pokemonDetail.weight}</p>
              <button
                onClick={handleClick}
                className="btn-outline-secondary btn btn-light btn-sm pokemonbutton mb-3"
              >
                View Statistic
              </button>
              {isClicked && (
                <div>
                  {pokemonDetail.stats?.map((stat, index) => {
                    return (
                      <p key={stat.stat.url}>
                        {capitalizeFirstLetter(stat.stat.name)}:{" "}
                        {stat.base_stat}
                      </p>
                    );
                  })}
                </div>
              )}
              <div>
                <Link to={`/pokemon/${pokemonDetail.name}/types`}>
                  <button className="btn-outline-secondary btn btn-light btn-sm pokemonbutton">
                    View Types
                  </button>
                </Link>
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
