import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PokemonInfo({ capitalizeFirstLetter }) {
  const [pokemonType, setPokemonType] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/pokemon/${name}/types`)
      .then((response) => {
        setPokemonType(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="text-center">
        Types:
        {pokemonType.map((typ) => {
          return (
            <div key={typ.type.url}>
              <p>{capitalizeFirstLetter(typ.type.name)}</p>
            </div>
          );
        })}
      </div>
      <div className="backbuttondiv">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn-outline-secondary btn btn-light btn-sm pokemonbutton"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
