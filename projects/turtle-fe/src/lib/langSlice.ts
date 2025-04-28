// langSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisci lo shape dello stato per la lingua
interface LangState {
  value: string; // "it", "en", ecc.
}

// Stato iniziale: ad esempio "it"
const initialState: LangState = {
  value: "en-US",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    // Azione per modificare la lingua
    setLang: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Esporta le azioni generate da createSlice
export const { setLang } = langSlice.actions;

// Esporta il reducer
export default langSlice.reducer;
