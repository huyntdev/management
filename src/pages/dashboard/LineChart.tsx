import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const fakeChart = [
  {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        data: [30, 97, 86, 18, 25, 10, 80],
        label: "Subcription",
        borderColor: "#da2d7d",
        tension: 0.1,
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
          50, 30, 97, 86, 18, 25, 10, 80, 22, 58, 87, 2, 90, 90, 5, 82, 18, 46,
          19, 98, 15, 27, 35, 2,
        ],
        label: "Subcription",
        borderColor: "#da2d7d",
        tension: 0.1,
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
          50, 97, 66, 18, 45, 10, 80, 30, 25, 60, 90, 55, 72, 43, 67, 28, 74,
          82, 40, 65, 71, 39, 88, 29, 95, 78, 83, 54, 92, 33,
        ],
        label: "Subscription",
        borderColor: "#da2d7d",
        tension: 0.1,
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
        data: [500, 300, 970, 860, 180, 250, 100, 800, 220, 580, 870, 200],
        label: "Subscription",
        borderColor: "#da2d7d",
        tension: 0.1,
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
        label: "Subcription",
        borderColor: "#da2d7d",
        tension: 0.1,
      },
    ],
    nameTypeChart: "customize",
  },
];

type DataSetProps = {
  data: number[];
  label: string;
  borderColor?: string;
  tension?: number;
};
const LineChart = ({
  typeChart,
  dateFromTo,
}: {
  typeChart: string;
  dateFromTo: string[];
}) => {
  const [dataCharts, setDataCharts] = useState(fakeChart[0]);

  const handleSubcription = (datasets: DataSetProps[]) => {
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
        <h4 className="font-semibold text-[13px]">Subcription</h4>
        <div className="text-base font-semibold">
          {handleSubcription(dataCharts.datasets)}
        </div>
      </div>
      <Line
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

export default LineChart;
