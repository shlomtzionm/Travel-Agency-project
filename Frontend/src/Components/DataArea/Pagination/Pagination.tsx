import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { VacationModel } from "../../../Models/vacationModel";
import { AppState, currentPageActions, store } from "../../../redux/store";
import { useSelector } from "react-redux";
import { moreServices } from "../../../Services/moreServices";

type MyPaginationProps = {
  vacations: VacationModel[];
  setVacationsToDisplay: (vacations: VacationModel[]) => void;
};

export function MyPagination(props: MyPaginationProps): JSX.Element {
  const ITEMS_PER_PAGE = 9;

  const currentPage = useSelector<AppState, number>(store => store.currentPage);

  useEffect(() => {
    const indexOfLastVacation = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstVacation = indexOfLastVacation - ITEMS_PER_PAGE;
    const currentVacations = props.vacations.slice(indexOfFirstVacation, indexOfLastVacation);
    props.setVacationsToDisplay(currentVacations);
  }, [currentPage, props.vacations]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    resetCurrentPage(page);
  };

  function resetCurrentPage(page: number): void {
    moreServices.setCurrentPage(page)

  }

  return (
    <div className="MyPagination">
      <Stack spacing={2}>
        <Pagination count={Math.ceil(props.vacations.length / ITEMS_PER_PAGE)} page={currentPage} onChange={handlePageChange} />
      </Stack>
    </div>
  );
}
