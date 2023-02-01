import { useState, useEffect } from "react";
import axios from "axios";

export default function PokeFight({ playerA, playerB }) {
  const [firstPokemon, setFirstPokemon] = useState("");
  const [secondPokemon, setSecondPokemon] = useState("");

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

  return (
    <>
      <div className="pokefight">
        <div> 1 player selected: {firstPokemon.name}</div>
        <div>2 player selected: {secondPokemon.name}</div>
      </div>
    </>
  );
}
