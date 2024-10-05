import { VacationModel } from "../Models/vacationModel";
import { currentPageActions, store } from "../redux/store";

class MoreServices {
  public filterByIsLike(vacations: VacationModel[]): VacationModel[] {
    return vacations.filter((v) => v.isSaved);
  }

  public filterByFuture(vacations: VacationModel[]): VacationModel[] {
    return vacations.filter((v) => new Date(v.startDate) > new Date());
  }

  public filterByNow(vacations: VacationModel[]): VacationModel[] {
    return vacations.filter((v) => new Date(v.startDate) < new Date() && new Date(v.endDate) > new Date());
  }


public setCurrentPage(number:number){
  const action = currentPageActions.updateCurrentPage(number);
  store.dispatch(action);
}

}

export const moreServices = new MoreServices();
