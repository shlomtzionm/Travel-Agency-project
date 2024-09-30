import { useDispatch, useSelector } from "react-redux";
import { VacationModel } from "../../../Models/vacationModel";
import { AppState, currentPageActions, filterStateActions, store } from "../../../redux/store";
import { filterServices } from "../../../Services/filterServices";
import { useEffect } from "react";
import "./Filter.css";
import { FilterState } from "../../../Models/enums";
import { FormControl, InputLabel, Select, MenuItem,SelectChangeEvent  } from "@mui/material";

interface FilterProps {
  setFilteredVacations: (vacations: VacationModel[]) => void;
  setCurrentPage: (number: number) => void;
}

function Filter(props: FilterProps): JSX.Element {
  const dispatch = useDispatch();

  const vacationsFromRedux = useSelector<AppState, VacationModel[]>(store => store.vacations);
  const filterState = useSelector<AppState, FilterState>(store => store.filterState);
  const currentPage = useSelector<AppState, number>(store => store.currentPage);

  function handleClick(event: SelectChangeEvent<FilterState>) {
    const value = event.target.value as FilterState;
    const action = filterStateActions.updateFilterState(value);
    dispatch(action);
  }

  function handleFilterChange() {
    let filteredVacations: VacationModel[] = [];

    switch (filterState) {
      case FilterState.All:
        filteredVacations = vacationsFromRedux;
        break;
      case FilterState.Liked:
        filteredVacations = filterServices.filterByIsLike(vacationsFromRedux);
        break;
      case FilterState.Future:
        filteredVacations = filterServices.filterByFuture(vacationsFromRedux);
        break;
      case FilterState.Now:
        filteredVacations = filterServices.filterByNow(vacationsFromRedux);
        break;
      default:
        filteredVacations = vacationsFromRedux;
        break;
    }
    props.setCurrentPage(currentPage);
    props.setFilteredVacations(filteredVacations);
  }

  useEffect(() => {
    handleFilterChange();
  }, [filterState, vacationsFromRedux]);

  function resetCurrentPage() {
    const action = currentPageActions.updateCurrentPage(1);
    store.dispatch(action);
  }

  return (
    <div className="Filter">
      <FormControl fullWidth>
        <InputLabel>Filter</InputLabel>
        <Select
          label="Filter"
          onChange={(event:SelectChangeEvent<FilterState>)=> {
            handleClick(event);
            resetCurrentPage();
          }}
        >
          <MenuItem value={FilterState.All}>All</MenuItem>
          <MenuItem value={FilterState.Liked}>Liked</MenuItem>
          <MenuItem value={FilterState.Future}>Future</MenuItem>
          <MenuItem value={FilterState.Now}>Now</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
