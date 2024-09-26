import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const fakeChart = [
  {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        data: [150, 177, 160, 228, 125, 30, 290],
        label: "Revenue",
        backgroundColor: ["#e28fd8"],
      },
    ],
    nameTypeChart: "last_week",
  },
  {
    labels: [
      "1h",
      "2h",
      "3h",
      "4h",
      "5h",
      "6h",
      "7h",
      "8h",
      "9h",
      "10h",
      "11h",
      "12h",
      "13h",
      "14h",
      "15h",
      "16h",
      "17h",
      "18h",
      "19h",
      "20h",
      "21h",
      "22h",
      "23h",
      "24h",
    ],
    datasets: [
      {
        data: [
          40, 10, 67, 76, 18, 25, 10, 20, 22, 58, 87, 2, 30, 10, 5, 82, 18, 46,
          19, 98, 15, 27, 35, 2,
        ],
        label: "Revenue",
        backgroundColor: ["#e28fd8"],
      },
    ],
    nameTypeChart: "today",
  },
  {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
      "Day 11",
      "Day 12",
      "Day 13",
      "Day 14",
      "Day 15",
      "Day 16",
      "Day 17",
      "Day 18",
      "Day 19",
      "Day 20",
      "Day 21",
      "Day 22",
      "Day 23",
      "Day 24",
      "Day 25",
      "Day 26",
      "Day 27",
      "Day 28",
      "Day 29",
      "Day 30",
    ],
    datasets: [
      {
        data: [
          60, 127, 56, 78, 75, 20, 80, 30, 25, 20, 90, 55, 72, 143, 67, 68, 74,
          82, 40, 65, 71, 39, 128, 29, 95, 78, 183, 154, 92, 33,
        ],
        label: "Subscription",
        backgroundColor: ["#e28fd8"],
      },
    ],
    nameTypeChart: "last_month",
  },
  {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [550, 680, 310, 390, 520, 590, 300, 200, 570, 695, 600, 650],
        label: "Subscription",
        backgroundColor: ["#e28fd8"],
      },
    ],
    nameTypeChart: "last_year",
  },
  {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
      "Day 11",
      "Day 12",
      "Day 13",
      "Day 14",
      "Day 15",
      "Day 16",
      "Day 17",
      "Day 18",
      "Day 19",
      "Day 20",
      "Day 21",
      "Day 22",
      "Day 23",
      "Day 24",
      "Day 25",
      "Day 26",
      "Day 27",
      "Day 28",
      "Day 29",
      "Day 30",
    ],
    datasets: [
      {
        data: [
          40, 87, 66, 28, 55, 20, 70, 20, 25, 50, 95, 45, 72, 43, 67, 28, 74,
          82, 40, 65, 71, 39, 88, 29, 95, 78, 83, 54, 92, 33,
        ],
        label: "Revenue",
        backgroundColor: ["#e28fd8"],
      },
    ],
    nameTypeChart: "customize",
  },
];

type DataSetProps = {
  data: number[];
  label: string;
  backgroundColor?: string[];
  tension?: number;
};

const BarChart = ({
  typeChart,
  dateFromTo,
}: {
  typeChart: string;
  dateFromTo: string[];
}) => {
  const [dataCharts, setDataCharts] = useState(fakeChart[0]);

  const handleRevenue = (datasets: DataSetProps[]) => {
    if (datasets.length > 0) {
      const total = datasets.reduce((prev, cur) => {
        const newTotalSub = cur.data.reduce((prevSub, curSub) => {
          return prevSub + curSub;
        }, 0);
        return prev + newTotalSub;
      }, 0);

      return total;
    }
    return 0;
  };

  useEffect(() => {
    if (typeChart) {
      if (typeChart === "customize" && (!dateFromTo[0] || !dateFromTo[1]))
        return;
      const chart = fakeChart.find(
        (element) => element.nameTypeChart === typeChart
      );

      setDataCharts((prev) => (chart ? chart : prev));
    }
  }, [dateFromTo, typeChart]);

  return (
    <div className="w-full max-w-[600px] border border-[rgba(26,26,26,0.07)] rounded-xl p-3">
      <div>
        <h4 className="font-semibold text-[13px]">Revenue</h4>
        <div className="text-base font-semibold flex gap-[2px]">
          <span>$</span>
          {handleRevenue(dataCharts.datasets)}
        </div>
      </div>
      <Bar
        data={dataCharts}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
