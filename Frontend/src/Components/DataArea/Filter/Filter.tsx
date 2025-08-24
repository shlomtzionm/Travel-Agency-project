import { useDispatch, useSelector } from "react-redux";
import { VacationModel } from "../../../Models/vacationModel";
import { AppState, currentPageActions, filterStateActions, store } from "../../../redux/store";
import { moreServices } from "../../../Services/moreServices";
import { useEffect } from "react";
import "./Filter.css";
import { FilterState } from "../../../Models/enums";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface FilterProps {
  setFilteredVacations: (vacations: VacationModel[]) => void;
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
      case FilterState.Favorites:
        filteredVacations = moreServices.filterByIsLike(vacationsFromRedux);
        break;
      case FilterState.Upcoming:
        filteredVacations = moreServices.filterByUpcoming(vacationsFromRedux);
        break;
      case FilterState.Current:
        filteredVacations = moreServices.filterByCurrent(vacationsFromRedux);
        break;
      default:
        filteredVacations = vacationsFromRedux;
        break;
    }
    moreServices.setCurrentPage(currentPage)
    props.setFilteredVacations(filteredVacations);
  }

  useEffect(() => {
    handleFilterChange();
  }, [filterState, vacationsFromRedux]);

  function resetCurrentPage() {
    moreServices.setCurrentPage(1)

  }

  return (
    <div className="Filter">
      <FormControl fullWidth>
        <InputLabel>Filter</InputLabel>
        <Select className="muiSelect"
          label="Filter"
          onChange={(event: SelectChangeEvent<FilterState>) => {
            handleClick(event);
            resetCurrentPage();
          }}
        >
          <MenuItem value={FilterState.All}>{FilterState.All}</MenuItem>
          <MenuItem value={FilterState.Favorites}>{FilterState.Favorites}</MenuItem>
          <MenuItem value={FilterState.Upcoming}>{FilterState.Upcoming}</MenuItem>
          <MenuItem value={FilterState.Current}>{FilterState.Current}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
