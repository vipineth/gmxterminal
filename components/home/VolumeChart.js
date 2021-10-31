import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  YAxis,
  Legend,
} from "recharts";
import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent";

import { toK, toNiceDate, toNiceDateYear } from "utils/dates";

function CustomBar({ x, y, width, height, fill }) {
  return (
    <g>
      <rect x={x} y={y} fill={fill} width={width} height={height} rx="2" />
    </g>
  );
}

function VolumeChart({ dailyVolume, isLoading }) {
  if (!dailyVolume) {
    return <h2>Loading</h2>;
  }
  return (
    <ResponsiveContainer height="100%">
      <BarChart data={dailyVolume}>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(d) => toNiceDate(d)}
          tick={{ fontSize: 12, color: "red" }}
          style={{
            fontSize: "0.85rem",
          }}
        />
        {/* <YAxis dataKey="all" tickFormatter={toK} />
        <YAxis
          dataKey="cumulative"
          orientation="right"
          yAxisId="right"
          tickFormatter={toK}
        /> */}

        <Tooltip
          content={<CustomTooltip />}
          cursor={true}
          formatter={(val) => toK(val, true)}
          labelFormatter={(label) => <Badge label={toNiceDateYear(label)} />}
          labelStyle={{ paddingTop: 4 }}
          contentStyle={{
            padding: "10px 14px",
            borderRadius: 10,
            borderColor: "black",
            fontSize: "1.25rem",
          }}
          wrapperStyle={{ top: -70, left: -10 }}
        />

        <Bar
          dataKey="burn"
          stackId="one"
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill="#DB2777"
              />
            );
          }}
        />
        <Bar
          dataKey="swap"
          stackId="one"
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill="#059669"
              />
            );
          }}
        />
        <Bar
          dataKey="margin"
          stackId="one"
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill="#D97706"
              />
            );
          }}
        />
        <Bar
          dataKey="mint"
          stackId="one"
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill="#4B5563"
              />
            );
          }}
        />
        <Line
          type="monotone"
          dot={false}
          strokeWidth={3}
          stroke="#ee64b8"
          dataKey="cumulative"
          yAxisId="right"
          name="Cumulative"
        />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip(props) {
  let values = props.payload.map(({ dataKey, value }) => ({
    name: dataKey,
    value,
    color: "black",
  }));
  if (values.length) {
    const newPayload = values.map((v) => {
      switch (v.name) {
        case "mint":
          return {
            ...v,
            name: "GLP Mint 👶",
          };
        case "burn":
          return {
            ...v,
            name: "GLP Burn 🔥",
          };
        case "margin":
          return {
            ...v,
            name: "Margin Trades",
          };
        case "swap":
          return {
            ...v,
            name: "Token Swaps",
          };
        default:
          return {};
      }
    });

    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }
  return <DefaultTooltipContent {...props} />;
}

function Badge(props) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded font-medium bg-gray-800 text-white mb-4 uppercase text-xs">
      <svg
        className="-ml-1 mr-1.5 h-2 w-2 text-white"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {props.label}
    </span>
  );
}

export default VolumeChart;
