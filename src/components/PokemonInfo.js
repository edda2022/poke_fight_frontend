import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function PokemonInfo({ capitalizeFirstLetter }) {
  const [pokemonType, setPokemonType] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`https://backend-heci.onrender.com/pokemon/${name}/types`)
      .then((response) => {
        setPokemonType(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="text-center pokemoninfo">
        <h3 className="pokemoninfoheading">
          {capitalizeFirstLetter(name)}'s Types
        </h3>
        {pokemonType.map((typ) => {
          return (
            <div key={typ.type.url}>
              <p className="types">{capitalizeFirstLetter(typ.type.name)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
