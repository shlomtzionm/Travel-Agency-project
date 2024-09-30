import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { VacationModel } from "../../../Models/vacationModel";
import { currentPageActions, store } from "../../../redux/store";

type MyPaginationProps = {
  vacations: VacationModel[];
  setVacationsToDisplay: (vacations: VacationModel[]) => void;
  setCurrentPage: (number: number) => void;
  currentPage: number;
};

export function MyPagination(props: MyPaginationProps): JSX.Element {
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const indexOfLastVacation = props.currentPage * ITEMS_PER_PAGE;
    const indexOfFirstVacation = indexOfLastVacation - ITEMS_PER_PAGE;
    const currentVacations = props.vacations.slice(indexOfFirstVacation, indexOfLastVacation);
    props.setVacationsToDisplay(currentVacations);
  }, [props.currentPage, props.vacations]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    props.setCurrentPage(page);
    resetCurrentPage(page);
  };

  function resetCurrentPage(page: number): void {
    const action = currentPageActions.updateCurrentPage(page);
    store.dispatch(action);
  }

  return (
    <div className="MyPagination">
      <Stack spacing={2}>
        <Pagination count={Math.ceil(props.vacations.length / ITEMS_PER_PAGE)} page={props.currentPage} onChange={handlePageChange} />
      </Stack>
    </div>
  );
}
