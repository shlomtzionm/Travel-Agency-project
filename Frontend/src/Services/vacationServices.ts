import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/vacationModel";
import { appConfig } from "../Utils/AppConfig";
import { store, vacationActions } from "../redux/store";
import { userService } from "./userService";

class VacationServices {
  public async getAllVacations(userId: number): Promise<VacationModel[]> {
    const token: string = await userService.waitForToken();
    const options: AxiosRequestConfig = appConfig.axiosOptions(token);
    const response = await axios.get<VacationModel[]>(appConfig.vacationByUsersUrl + userId, options);
    const action = vacationActions.initVacations(response.data);
    store.dispatch(action);
    return response.data;
  }

  public async updateIsFavorite(isFavorite: boolean, userId: number, vacationId: number): Promise<VacationModel> {
    const token: string = await userService.waitForToken();
    const options: AxiosRequestConfig = appConfig.axiosOptions(token);
    const isFavoriteValue = isFavorite ? 1 : 0;
    const response = await axios.put(`${appConfig.favoritesUrl}${userId}/${vacationId}`, { isFavorite: isFavoriteValue }, options);
    const updatedVacation: VacationModel = response.data;
    const action = vacationActions.updateIsFavorite(updatedVacation);
    store.dispatch(action);
    return updatedVacation;
  }

  public async updateVacation(userId: number, vacationId: number, vacationBody: VacationModel): Promise<VacationModel> {
    const token: string = await userService.waitForToken();
    const options: AxiosRequestConfig = appConfig.axiosOptions(token);
    const res = await axios.patch(`${appConfig.vacationsUrl}${vacationId}/${userId}`, vacationBody, options);
    const action = vacationActions.updateVacation(res.data);
    store.dispatch(action);
    return res.data;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    const token: string = await userService.waitForToken();
    const options: AxiosRequestConfig = appConfig.axiosOptions(token);
    await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);
  }

  public async deleteVacation(vacationId: number): Promise<void> {
    const token: string = await userService.waitForToken();
    const options: AxiosRequestConfig = appConfig.axiosOptions(token);
    await axios.delete<void>(appConfig.vacationsUrl + vacationId, options);
    const action = vacationActions.deleteVacation(vacationId);
    store.dispatch(action);
  }
}

export const vacationServices = new VacationServices();
