import CanvasJSReact from "@canvasjs/react-charts";
import { useSelector } from "react-redux";
import { VacationModel } from "../../../Models/vacationModel";
import { AppState } from "../../../redux/store";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Chart = () => {
  const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vacations || vacations.length === 0) {
      notify.error("No data available to display");
      navigate("/list");
    }
  }, [vacations]);

  const options = {
    axisX: {
      interval: 1,
    },
    title: {
      text: "Favorites Count",
    },
    data: [
      {
        color: "#007bff",
        type: "column",
        dataPoints: vacations.map(v => ({ label: v.location, y: v.favoritesCount })),
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: " 5% auto" }}>
      <CanvasJSReact.CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
