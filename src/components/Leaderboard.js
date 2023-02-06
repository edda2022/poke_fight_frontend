import { useEffect, useState } from "react";
import  axios  from "axios";

export default function Leaderboard() {

    const [results, setResults] = useState([])

    useEffect(() => {
        axios
          .get(`http://localhost:8082/fightresult`)
          .then((response) => {
            console.log(response.data);
            setResults(response.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return(
        <>
        <div className="errorpage d-flex flex-column justify-content-center align-items-center">
            <div>Here are the results of the last games:</div>   
            <div>
                {results.map((result) => {
                    return <div>{result._id} - {result.count}</div>
                })}
            </div>   
            {/* <div>{results}</div>         */}
        </div>
        </>
    )
}