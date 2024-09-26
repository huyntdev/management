import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { DatePicker, Select } from "antd";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const optionDateSelect = [
  { value: "today", label: "Today" },
  { value: "last_week", label: "Last 7 days" },
  { value: "last_month", label: "Last month" },
  { value: "last_year", label: "Last year" },
  { value: "customize", label: "Customize" },
];
const { RangePicker } = DatePicker;

const DashboardPage = () => {
  const [typeChart, setTypeChart] = useState("last_week");
  const [dateFromTo, setDateFromTo] = useState<string[]>(["", ""]);

  //Handle API select time
  const handleChangeDate = (value: string) => {
    setTypeChart(value);
    setDateFromTo(["", ""]);
  };

  const onchangeDateFromTo = (value: string[]) => {
    setDateFromTo(value);
  };

  return (
    <div>
      <div className="py-4">
        <h3 className="text-2xl font-semibold">Dashboard</h3>
      </div>
      <div>
        <div className="flex items-center gap-3 mb-4">
          {" "}
          <Select
            onChange={handleChangeDate}
            value={typeChart}
            style={{ width: 150 }}
            options={optionDateSelect}
          />
          {typeChart === "customize" ? (
            <RangePicker
              placement={"bottomRight"}
              placeholder={["From Date", "To Date"]}
              onChange={(_, stringValue) => onchangeDateFromTo(stringValue)}
            />
          ) : null}
        </div>
        <div className="flex gap-3 flex-wrap">
          <LineChart typeChart={typeChart} dateFromTo={dateFromTo}></LineChart>
          <BarChart typeChart={typeChart} dateFromTo={dateFromTo}></BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
