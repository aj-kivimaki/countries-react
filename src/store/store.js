import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";
import searchTermReducer from "./searchTermSlice";

export default configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouritesReducer,
    searchTerm: searchTermReducer,
  },
});
