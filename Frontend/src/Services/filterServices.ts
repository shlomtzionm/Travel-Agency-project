import { VacationModel } from "../Models/vacationModel";

class FilterServices {
  public filterByIsLike(vacations: VacationModel[]): VacationModel[] {
    return vacations.filter((v) => v.isLiked);
  }

  public filterByFuture(vacations: VacationModel[]): VacationModel[] {
    return vacations.filter((v) => new Date(v.startDate) > new Date());
  }

  public filterByNow(vacations: VacationModel[]): VacationModel[] {
    return vacations.filter((v) => new Date(v.startDate) < new Date() && new Date(v.endDate) > new Date());
  }
}

export const filterServices = new FilterServices();
