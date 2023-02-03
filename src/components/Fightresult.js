export default function Fightresult({playerA, playerB,scorePlayerA, scorePlayerB }) {

    console.log(scorePlayerA)
    return(
        <>
       <div>SCORES:{playerA}: {scorePlayerA}
       {playerB}: {scorePlayerB}</div>
        </>
    )
}