import { CustomResponsiveContainer } from "components/common/CustomResponsiveContainer";
import {
  Bar,
  XAxis,
  Tooltip,
  Line,
  YAxis,
  Legend,
  CartesianGrid,
  ComposedChart,
} from "recharts";

import { chartLabels, COLORS } from "utils/config";

import { toK, toNiceDate, toNiceDateYear } from "utils/dates";

function CustomBar({ x, y, width, height, fill }) {
  return (
    <g>
      <rect x={x} y={y} fill={fill} width={width} height={height} rx="2" />
    </g>
  );
}

function VolumeChart({ dailyVolume, isLoading }) {
  return (
    <CustomResponsiveContainer height="100%">
      <ComposedChart data={dailyVolume} className="pt-2 pb-12">
        <XAxis
          dataKey="timestamp"
          tickFormatter={(d) => toNiceDate(d)}
          tick={{ fontSize: 12, color: "red" }}
          style={{
            fontSize: "0.85rem",
          }}
        />
        <CartesianGrid vertical={false} />
        <YAxis
          allowDecimals={false}
          dataKey="all"
          axisLine={false}
          tickLine={2}
          tick={{ fontSize: 13 }}
          tickFormatter={toK}
        />
        <YAxis
          dataKey="cumulative"
          orientation="right"
          yAxisId="right"
          tick={{ fontSize: 13 }}
          axisLine={false}
          tickLine={2}
          tickFormatter={toK}
          allowDecimals={false}
          name="Cumulative"
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={true}
          formatter={(val) => toK(val, true)}
          labelStyle={{ paddingTop: 4 }}
          contentStyle={{
            padding: "10px 14px",
            borderRadius: 10,
            borderColor: "black",
            fontSize: "1.25rem",
          }}
          wrapperStyle={{ top: -70, left: -10 }}
        />
        <Legend content={<CustomLegend />} />

        <Bar
          dataKey="swap"
          stackId="one"
          fill={COLORS[1]}
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill={COLORS[1]}
              />
            );
          }}
        />
        <Bar
          dataKey="margin"
          stackId="one"
          fill={COLORS[2]}
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill={COLORS[2]}
              />
            );
          }}
        />
        <Bar
          dataKey="mint"
          stackId="one"
          fill={COLORS[3]}
          name="mint"
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill={COLORS[3]}
              />
            );
          }}
        />
        <Bar
          dataKey="burn"
          stackId="one"
          fill={COLORS[0]}
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill={COLORS[0]}
              />
            );
          }}
        />
        <Line
          type="monotone"
          dot={false}
          strokeWidth={3}
          stroke={COLORS[4]}
          dataKey="cumulative"
          yAxisId="right"
          name="cumulative"
        />
      </ComposedChart>
    </CustomResponsiveContainer>
  );
}

function CustomLegend(props) {
  let values = props.payload.map(({ dataKey, value, ...rest }) => ({
    name: dataKey,
    value,
    color: "black",
    ...rest,
  }));
  if (values.length) {
    const newPayload = values.map((v) => {
      return {
        ...v,
        name: chartLabels[v.name],
      };
    });
    return (
      <div className="text-center mt-4 mb-2">
        {newPayload.map((p) => (
          <div key={p.name} className="inline-flex items-center mr-2">
            <span
              className="p-2 w-2 inline-block mr-2"
              style={{ backgroundColor: p.color }}
            ></span>
            <dt className="text-sm font-medium text-gray-500">{p.name}</dt>
          </div>
        ))}
      </div>
    );
  }
  return <></>;
}

function CustomTooltip(props) {
  let values = props.payload?.map(({ dataKey, value, ...rest }) => ({
    name: dataKey,
    value,
    color: "black",
    ...rest,
  }));
  if (values.length) {
    const newPayload = values.map((v) => {
      return {
        ...v,
        name: chartLabels[v.name],
      };
    });
    return <ToolTipCard {...props} payload={newPayload} />;
  }
  return <ToolTipCard {...props} />;
}

function ToolTipCard({ label, payload, formatter }) {
  return (
    <section
      className="shadow-lg hidden sm:block"
      aria-labelledby="achart-tooltip"
    >
      <div className="bg-white shadow-xl sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2
            id="achart-tooltip"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            {toNiceDateYear(label)}
          </h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid gap-x-4 gap-y-6 grid-cols-2">
            {payload.map((p) => (
              <div key={p.name} className="sm:col-span-1">
                <div className="inline-flex items-center">
                  <span
                    className="p-2 w-2 inline-block mr-2"
                    style={{ backgroundColor: p.color }}
                  ></span>
                  <dt className="text-sm font-medium text-gray-500">
                    {p.name}
                  </dt>
                </div>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatter(p.value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default VolumeChart;
