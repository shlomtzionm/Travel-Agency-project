import { Action, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/vacationModel";
import { UserModel } from "../Models/userModel";
import { FilterState } from "../Models/enums";

export function initVacations(currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
  const newState: VacationModel[] = action.payload; // Here, action.payload is all products to init.
  return newState;
}

export function updateFilterState(currentState: FilterState, action: PayloadAction<FilterState>): FilterState {
  const newState: FilterState = action.payload; // Here, action.payload is all products to init.
  return newState;
}

// Add product:
export function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
  const newState: VacationModel[] = [...currentState];
  newState.push(action.payload); // Here, action.payload is a product to add.
  return newState;
}

export function updateIsSaved(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
  return currentState.map(v => (v.id === action.payload.id ? { ...v, isSaved: action.payload.isSaved, likesCount: action.payload.isSaved ? v.likesCount + 1 : v.likesCount - 1 } : v));
}

export function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
  return currentState.map(v => (v.id === action.payload.id ? action.payload : v));
}

export function deleteVacation(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
  return currentState.filter(v => v.id !== action.payload);
}

export function initUser(currentState:Partial< UserModel>, action: PayloadAction<Partial<UserModel>>):Partial< UserModel> {
  const newState:Partial< UserModel> = action.payload;
  return newState;
}

export function logoutUser(currentState:Partial< UserModel>, action: Action):Partial< UserModel> {
  const newState:Partial< UserModel> = null;
  return newState;
}

export function updateCurrentPage(currentState: number, action: PayloadAction<number>): number {
  const newState: number = action.payload;
  return newState;
}
