import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/userModel";
import { currentPageActions, filterStateActions, store, userActions } from "../redux/store";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";
import { FilterState } from "../Models/enums";

class UserService {
  public constructor() {
    const token: string = localStorage.getItem("token");
    if (!token) return;
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser: UserModel = container.user;
    const action = userActions.initUser(dbUser);
    store.dispatch(action);
  }

  public async waitForToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const checkToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
          resolve(token);
        } else {
          setTimeout(checkToken, 100);
        }
      };
      checkToken();
    });
  }

  public async register(user:Partial< UserModel>): Promise<void> {
    const response = await axios.post<string>(appConfig.registerUrl, user);
    const token: string = response.data;
    localStorage.setItem("token", token);
    const container = jwtDecode<{ user:Partial< UserModel >}>(token);
    const dbUser:Partial< UserModel> = container.user;
    const action = userActions.initUser(dbUser);
    store.dispatch(action);
    const resetPageAction = currentPageActions.updateCurrentPage(1);
    store.dispatch(resetPageAction);
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post(appConfig.loginUrl, credentials);
    const token: string = response.data;
    localStorage.setItem("token", token);
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;
    const action = userActions.initUser(dbUser);
    store.dispatch(action);
    const resetPageAction = currentPageActions.updateCurrentPage(1);
    store.dispatch(resetPageAction);
  }

  public logout(): void {
    localStorage.removeItem("token");
    const action = userActions.logoutUser();
    store.dispatch(action);
    store.dispatch(filterStateActions.updateFilterState(FilterState.All))
    store.dispatch(currentPageActions.updateCurrentPage(1))
  }

  public async isTokenValid(): Promise<boolean> {
    let token: string = await this.waitForToken();
    const response = await axios.post(appConfig.tokenUrl, { token });
    return response.data;
  }
}

export const userService = new UserService();
