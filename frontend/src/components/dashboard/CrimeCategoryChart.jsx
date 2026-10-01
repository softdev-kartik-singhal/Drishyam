import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import ChartCard from "./ChartCard";

const CATEGORY_STYLE_MAP = {
  "CDR / IPDR": {
    color: "#E2B4BD",
    gradientId: "pieGradCdr",
    light: "#F7D6D0",
    dark: "#B87584",
    shadow: "rgba(226, 180, 189, 0.4)"
  },
  "Bank / UPI Logs": {
    color: "#10b981",
    gradientId: "pieGradBank",
    light: "#34d399",
    dark: "#047857",
    shadow: "rgba(16, 185, 129, 0.4)"
  },
  "Email Headers": {
    color: "#f59e0b",
    gradientId: "pieGradEmail",
    light: "#fbbf24",
    dark: "#b45309",
    shadow: "rgba(245, 158, 11, 0.4)"
  },
  "Chat Exports": {
    color: "#F7D6D0",
    gradientId: "pieGradChat",
    light: "#FFF5F5",
    dark: "#E2B4BD",
    shadow: "rgba(247, 214, 208, 0.4)"
  },
  "Android / APK Logs": {
    color: "#ec4899",
    gradientId: "pieGradApk",
    light: "#f472b6",
    dark: "#be185d",
    shadow: "rgba(236, 72, 153, 0.4)"
  }
};

const DEFAULT_STYLE = {
  color: "#E2B4BD",
  gradientId: "pieGradDefault",
  light: "#F7D6D0",
  dark: "#B87584",
  shadow: "rgba(226, 180, 189, 0.4)"
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const style = CATEGORY_STYLE_MAP[data.category] || DEFAULT_STYLE;

    return (
      <div className="bg-[#2B2B2B] border border-[#E2B4BD]/50 p-2.5 rounded shadow-xl text-xs font-mono">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: style.color }} />
          <span className="font-bold text-white uppercase">{data.category}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300">
          <span>FIR Count:</span>
          <span className="font-bold text-white tabular-nums">{data.fir_count.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-300">
          <span>Statewide Share:</span>
          <span className="font-bold text-[#E2B4BD] tabular-nums">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const CrimeCategoryChart = ({ data }) => {
  const chartData = data || [];
  const totalFirs = chartData.reduce((acc, curr) => acc + (curr.fir_count || 0), 0);

  return (
    <ChartCard
      title="Categorical Offence Breakdown"
      subtitle="Relative distribution by forensic evidence category"
      badge="CLASSIFICATION ENGINE"
    >
      <div className="flex flex-col md:flex-row items-center gap-4 h-full min-h-[300px]">
        {/* Donut Chart Container */}
        <div className="w-full md:w-1/2 h-[220px] relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {Object.entries(CATEGORY_STYLE_MAP).map(([key, style]) => (
                  <linearGradient key={key} id={style.gradientId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={style.light} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={style.dark} stopOpacity={0.95} />
                  </linearGradient>
                ))}
                <linearGradient id={DEFAULT_STYLE.gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={DEFAULT_STYLE.light} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={DEFAULT_STYLE.dark} stopOpacity={0.95} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                dataKey="fir_count"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={88}
                paddingAngle={3}
                stroke="rgba(43,43,43,0.8)"
                strokeWidth={2}
              >
                {chartData.map((entry, index) => {
                  const style = CATEGORY_STYLE_MAP[entry.category] || DEFAULT_STYLE;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#${style.gradientId})`}
                      className="transition-all duration-200 hover:opacity-80"
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Donut Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F7D6D0]">
              TOTAL
            </span>
            <span className="text-xl font-extrabold text-white tabular-nums tracking-tight font-sans">
              {totalFirs.toLocaleString("en-IN")}
            </span>
            <span className="text-[9px] font-mono font-bold tracking-wider text-[#E2B4BD] uppercase mt-0.5">
              RECORDS
            </span>
          </div>
        </div>

        {/* Legend / Category List */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-2 font-mono text-xs">
          {chartData.map((item) => {
            const style = CATEGORY_STYLE_MAP[item.category] || DEFAULT_STYLE;
            return (
              <div
                key={item.category}
                className="flex items-center justify-between p-2 rounded bg-[#2B2B2B] border border-[#4A4A4A] hover:border-[#E2B4BD]/50 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: style.color }}
                  />
                  <span className="text-slate-200 truncate">{item.category}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <span className="text-slate-400 font-bold tabular-nums">
                    {item.fir_count.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[#E2B4BD] font-bold w-9 text-right tabular-nums">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ChartCard>
  );
};

export default CrimeCategoryChart;