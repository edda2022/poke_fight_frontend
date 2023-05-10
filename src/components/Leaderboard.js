import { useEffect, useState } from "react";
import axios from "axios";
export default function Leaderboard({ capitalizeFirstLetter }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      // .get(`http://localhost:8082/fightresult`)
      .get(`https://poke-fight.onrender.com/fightresult`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-2">
        <h1>Results of the last games</h1>
        <div>
          <table className="table leaderboard_table">
            <thead>
              <tr>
                <th scope="col" className="leaderboard_table_head">
                  Pokémon
                </th>
                <th scope="col" className="leaderboard_table_head">
                  Total Score
                </th>
                <th scope="col" className="leaderboard_table_head">
                  Total matches won
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
                return (
                  <tr key={result._id}>
                    <th scope="row">{capitalizeFirstLetter(result._id)}</th>
                    <td className="text-center">{result.sum_val}</td>
                    <td className="text-center">{result.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
