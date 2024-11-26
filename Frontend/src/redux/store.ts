import { configureStore, createSlice } from "@reduxjs/toolkit";
import { deleteVacation, initUser, initVacations, updateFilterState, logoutUser, updateIsFavorite, updateVacation, updateCurrentPage } from "./reducers";
import { VacationModel } from "../Models/vacationModel";
import { UserModel } from "../Models/userModel";
import { FilterState } from "../Models/enums";

export type AppState = {
  vacations: VacationModel[];
  user: UserModel | null;
  filterState: FilterState;
  currentPage: number;
};

const initialVacationsState: VacationModel[] = [];
const initialUserState: UserModel | null = null;

const vacationSlice = createSlice({
  name: "vacations", // Internal use
  initialState: initialVacationsState,
  reducers: { initVacations, updateIsFavorite, updateVacation, deleteVacation },
});

const filterStateSlice = createSlice({
  name: "filterState", // Internal use
  initialState: FilterState.All,
  reducers: { updateFilterState },
});

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: { initUser, logoutUser },
});

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: 1,
  reducers: { updateCurrentPage },
});

// Creating action creators:
export const vacationActions = vacationSlice.actions;
export const filterStateActions = filterStateSlice.actions;
export const userActions = userSlice.actions;
export const currentPageActions = currentPageSlice.actions;

// Main redux object:
export const store = configureStore<AppState>({
  reducer: {
    vacations: vacationSlice.reducer, // Product state.
    filterState: filterStateSlice.reducer, // Product state.
    user: userSlice.reducer, // User state
    currentPage: currentPageSlice.reducer, // User state
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Optionally, you can also define `AppDispatch` type
export type AppDispatch = typeof store.dispatch;
