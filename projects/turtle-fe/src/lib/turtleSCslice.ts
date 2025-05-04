// langSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {routes, adminRoutes} from "../routes"

// Definisci lo shape dello stato per la lingua
interface TurltleSCstate {
  user_authority: string; // "sc_creator", "turtle_creator", "turtle_modifier".
  routes: Array<any>;
}

// Stato iniziale: ad esempio "it"
const initialState: TurltleSCstate = {
  user_authority: "",
  routes: []
};

export const turtleSCslice = createSlice({
  name: "turtleSC",
  initialState,
  reducers: {
    // Azione per modificare la lingua
    setUserAuthorityScCreator: (state) => {
      state.user_authority = "sc_creator";
      state.routes = adminRoutes
    },
    setUserAuthorityTurtleCreator: (state) => {
      state.user_authority = "turtle_creator";
      state.routes = routes

    },
    setUserAuthorityScModifier: (state) => {
      state.user_authority = "turtle_modifier";
      state.routes = routes

    },
    setUserAuthorityDefault: (state) => {
      state.user_authority = "";
      state.routes = routes

    },
    
  },

});

// Esporta le azioni generate da createSlice
export const { setUserAuthorityScCreator, setUserAuthorityTurtleCreator, setUserAuthorityScModifier } = turtleSCslice.actions;

// Esporta il reducer
export default turtleSCslice.reducer;
