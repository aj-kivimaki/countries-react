import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite(state, action) {
      if (
        state.favourites.some(
          (favourite) => favourite.name.common === action.payload.name.common
        )
      )
        return;
      state.favourites = [...state.favourites, action.payload];
    },
    clearFavourites(state) {
      state.favourites = [];
    },
    removeFavourite(state, action) {
      console.log(action.payload, "s");
      state.favourites = state.favourites.filter(
        (favourite) => favourite.name.common !== action.payload.name.common
      );
    },
  },
});

export const { addFavourite, clearFavourites, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
