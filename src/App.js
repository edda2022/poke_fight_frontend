import "./App.css";
import { Routes, Route, Link, useNavigate, NavLink } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonPage from "./components/PokemonPage";
import Homepage from "./components/Homepage";
import Berries from "./components/Berries";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PokemonInfo from "./components/PokemonInfo";
import PokeFight from "./components/PokeFight";
import Fightresult from "./components/Fightresult";
import Navbar from "./components/Navbar"
import { useState } from "react";

function App() {
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");
  const [scorePlayerA, setScorePlayerA] = useState(0);
  const [scorePlayerB, setScorePlayerB] = useState(0);

  function capitalizeFirstLetter(i) {
    return i?.charAt(0).toUpperCase() + i?.slice(1);
  }

  return (
    <>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/pokemon"
            element={
              <PokemonList capitalizeFirstLetter={capitalizeFirstLetter} />
            }
          ></Route>
          <Route
            path="/pokemon/:name"
            element={
              <PokemonPage
                capitalizeFirstLetter={capitalizeFirstLetter}
                setPlayerA={setPlayerA}
                playerA={playerA}
                setPlayerB={setPlayerB}
                playerB={playerB}
              />
            }
          ></Route>
          <Route
            path="/pokemon/:name/types"
            element={
              <PokemonInfo capitalizeFirstLetter={capitalizeFirstLetter} />
            }
          ></Route>
          <Route
            path="/pokefight"
            element={
              <PokeFight
                capitalizeFirstLetter={capitalizeFirstLetter}
                playerA={playerA}
                playerB={playerB}
                setPlayerA={setPlayerA}
                setPlayerB={setPlayerB}
                scorePlayerA={scorePlayerA}
                scorePlayerB={scorePlayerB}
                setScorePlayerA={setScorePlayerA}
                setScorePlayerB={setScorePlayerB}
              />
            }
          ></Route>
          <Route
            path="/pokefight/fightresult"
            element={
              <Fightresult
                playerA={playerA}
                playerB={playerB}
                setPlayerB={setPlayerB}
                scorePlayerA={scorePlayerA}
                scorePlayerB={scorePlayerB}
                setScorePlayerA={setScorePlayerA}
                setScorePlayerB={setScorePlayerB}
                capitalizeFirstLetter={capitalizeFirstLetter}

              />
            }
          ></Route>
          <Route path="/berries" element={<Berries />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
