export default function Searchbar({
  handleOnChange,
  inputSearch,
  handleSearch,
}) {
  return (
    <div>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          className="form-control bg-light"
          type="text"
          required
          placeholder="Search for a Pokemon name or ID"
          onChange={handleOnChange}
          value={inputSearch}
        ></input>
        <button
          type="submit"
          className="btn btn-secondary btn-outline-warning "
        >
          Search
        </button>
      </form>
    </div>
  );
}
