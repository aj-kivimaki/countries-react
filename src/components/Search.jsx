import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/searchTermSlice";

const Search = () => {
  const dispatch = useDispatch();

  function setSearch(e) {
    dispatch(setSearchTerm(e.target.value));
  }

  return (
    <div className="search">
      <label className="icon" htmlFor="search">
        🔍
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search..."
        onChange={setSearch}
      />
    </div>
  );
};
export default Search;
