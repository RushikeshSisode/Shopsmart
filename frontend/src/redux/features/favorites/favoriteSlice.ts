import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IFavoritesState } from "../../../types";

const initialState: IFavoritesState = [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<IProduct>) => {
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<IProduct>) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action: PayloadAction<IProduct[]>) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProduct = (state: { favorites: IFavoritesState }) => state.favorites;
export default favoriteSlice.reducer;