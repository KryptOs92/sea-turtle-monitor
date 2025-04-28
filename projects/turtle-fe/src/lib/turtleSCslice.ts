// langSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisci lo shape dello stato per la lingua
interface TurltleSCstate {
  user_authority: string; // "sc_creator", "turtle_creator", "turtle_modifier".
}

// Stato iniziale: ad esempio "it"
const initialState: TurltleSCstate = {
  user_authority: "",
};

export const turtleSCslice = createSlice({
  name: "turtleSC",
  initialState,
  reducers: {
    // Azione per modificare la lingua
    setUserAuthorityScCreator: (state) => {
      state.user_authority = "sc_creator";
    },
    setUserAuthorityTurtleCreator: (state) => {
      state.user_authority = "turtle_creator";
    },
    setUserAuthorityScModifier: (state) => {
      state.user_authority = "turtle_modifier";
    },
  },
});

// Esporta le azioni generate da createSlice
export const { setUserAuthorityScCreator, setUserAuthorityTurtleCreator, setUserAuthorityScModifier } = turtleSCslice.actions;

// Esporta il reducer
export default turtleSCslice.reducer;
