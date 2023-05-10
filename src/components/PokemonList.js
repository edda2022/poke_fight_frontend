import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pokemon from "./Pokemon";
import Searchbar from "./Searchbar";
import Error from "./Error";
import Pagination from "./Pagination";

export default function PokemonList({ capitalizeFirstLetter }) {
  const [pokemons, setPokemons] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  // rendering the PokemonList once when loading
  useEffect(() => {
    axios
      .get("https://poke-fight.onrender.com/pokemon")
      .then((response) => {
        setPokemons(response.data.results);
        setTotalCount(response.data.count); // total number of Pokemons in that API for pageCount Pagination
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // getting the value of the search input field
  const handleOnChange = (e) => {
    setInputSearch(e.target.value);
  };

  // if submitting:
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`https://poke-fight.onrender.com/pokemon/${inputSearch}`)
      .then((response) => {
        navigate(`/pokemon/${inputSearch}`);
        // setSearchPokemons(response.data) nnc anymore due to 'navigate'
        // setSearch(true)
      })
      .catch((err) => {
        console.log(err);
        setErrorSearch(true);
      })
      .finally(() => {
        setInputSearch("");
      });
  };

  return (
    <>
      <div className="searchbar">
        <Searchbar
          inputSearch={inputSearch}
          handleOnChange={handleOnChange}
          handleSearch={handleSearch}
        />
      </div>

      <>
        {errorSearch ? (
          <Error />
        ) : (
          <>
            <div className="container">
              <div className="row gap-4 my-5">
                {pokemons?.map((pokemon) => {
                  return (
                    <Pokemon
                      key={pokemon.name}
                      pokemon={pokemon}
                      capitalizeFirstLetter={capitalizeFirstLetter}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <Pagination
                pokemons={pokemons}
                setPokemons={setPokemons}
                totalCount={totalCount}
              />
            </div>
          </>
        )}
      </>
    </>
  );
}
