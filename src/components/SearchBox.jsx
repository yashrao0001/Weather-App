import "./SearchBox.css";
import Search_Icon from "../assets/search.png";

function SearchBox({ city, handleSubmit, handleInput }) {
  return (
    <form onSubmit={handleSubmit} className="searchBar">
      <input
        type="text"
        placeholder="Search"
        value={city}
        onChange={handleInput}
      />
      <button className="hidden_btn">
        <img src={Search_Icon} alt="search_Icon" />
      </button>
    </form>
  );
}
export default SearchBox;
