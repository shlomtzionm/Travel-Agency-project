import Papa from "papaparse";
import { VacationModel } from "../../../Models/vacationModel";
import { notify } from "../../../Utils/Notify";

let report: [string, number | string][] = [["Location", "Amount"]];

export function createReport(vacations: VacationModel[]) {
  vacations.forEach(v => {
    const newRow: [string, number] = [v.location, v.likesCount];
    report.push(newRow);
  });

  const csv = Papa.unparse(report);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    // Create an object URL for the Blob and set it as the href of the link
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "vacations_report.csv"); // Filename for the download
    link.style.visibility = "hidden"; // Hide the link
    document.body.appendChild(link);
    if (vacations.length === 0) {
      notify.error("No data available");
    } else {
      link.click(); // Trigger the download
    }
    document.body.removeChild(link); // Clean up
  }
}
