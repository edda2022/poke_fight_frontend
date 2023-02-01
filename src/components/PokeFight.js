export default function PokeFight({ capitalizeFirstLetter, playerA, playerB }) {
  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center">
    <h2 className="justify-content-center align-items-center">Here are the 2 Pokémons fighting against each other</h2>
        </div>
      <div className="pokefight">
        <div className="card playerA">
          <img src="" className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{capitalizeFirstLetter(playerA)}</h5>
            <p className="card-text">Here comes the Pokemon info</p>
          </div>
        </div>

        <div className="card playerB">
          <img src="" className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{capitalizeFirstLetter(playerB)}</h5>
            <p className="card-text">Here comes the Pokemon info</p>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-danger btn-lg">FIGHT!</button>

    </>
  );
}
