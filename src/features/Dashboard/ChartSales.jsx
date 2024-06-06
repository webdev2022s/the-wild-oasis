import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContextProvider";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatDate } from "../../utils/helper";

const StyledChart = styled.div`
  grid-column: 1/-1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function ChartSales({ numStay, booking }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numStay - 1),
    end: new Date(),
  });

  const data = allDates.map((dates) => {
    return {
      label: format(dates, "MMM dd"),
      totalSales: booking
        .filter((oldData) => isSameDay(dates, new Date(oldData.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: booking
        .filter((oldData) => isSameDay(dates, new Date(oldData.created_at)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledChart>
      <Heading as="h2">
        Sales Chart from {formatDate(allDates.at(0))}&mdash;
        {formatDate(allDates.at(-1))}
      </Heading>
      <ResponsiveContainer width={"100%"} height={500}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"$"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            type={"monotone"}
            dataKey={"totalSales"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit={"$"}
          />

          <Area
            type={"monotone"}
            dataKey={"extrasSales"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledChart>
  );
}
