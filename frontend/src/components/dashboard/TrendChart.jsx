import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import ChartCard from "./ChartCard";
import { FaCalendarAlt } from "react-icons/fa";

const TrendChart = ({ data, districtName }) => {
  const [viewMode, setViewMode] = useState("total"); // "total" | "category"

  const peakMonthObj = data && data.length > 0
    ? [...data].sort((a, b) => b.total_crimes - a.total_crimes)[0]
    : null;

  const titleSuffix = (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#333333] border border-[#4A4A4A] px-2.5 py-1 rounded">
        <FaCalendarAlt className="text-[#E2B4BD] text-[10px]" />
        <span>Trailing 12-Month</span>
      </span>
      {districtName && (
        <span className="text-xs text-emerald-400 font-mono font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
          {districtName}
        </span>
      )}
    </div>
  );

  const avgMonthlyCases = data && data.length > 0
    ? Math.round(data.reduce((acc, curr) => acc + (curr.total_crimes || 0), 0) / data.length)
    : 0;

  return (
    <ChartCard
      title="Temporal Crime Trajectory"
      subtitle="Monthly registration volume with seasonal moving averages"
      badge="CCTNS TREND ENGINE"
      headerRight={titleSuffix}
    >
      <div className="flex flex-col gap-4 font-sans">
        {/* Metric Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          {/* Mode Switcher */}
          <div className="bg-[#2B2B2B] border border-[#4A4A4A] p-1.5 rounded flex items-center gap-1 col-span-2 md:col-span-1">
            <button
              onClick={() => setViewMode("total")}
              className={`flex-1 py-1 text-[11px] font-bold rounded transition-colors ${
                viewMode === "total"
                  ? "bg-[#E2B4BD] text-[#4A4A4A] font-bold shadow-sm border border-[#F7D6D0]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Overall Trend
            </button>
            <button
              onClick={() => setViewMode("category")}
              className={`flex-1 py-1 text-[11px] font-bold rounded transition-colors ${
                viewMode === "category"
                  ? "bg-[#E2B4BD] text-[#4A4A4A] font-bold shadow-sm border border-[#F7D6D0]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              By Category
            </button>
          </div>

          <div className="bg-[#2B2B2B] border border-[#4A4A4A] p-2 rounded flex flex-col justify-between">
            <span className="text-[9px] text-[#F7D6D0] uppercase tracking-widest font-semibold">PEAK MONTH</span>
            <span className="font-bold text-amber-300 mt-0.5 text-[11px]">
              {peakMonthObj ? `${peakMonthObj.month} (${peakMonthObj.total_crimes} FIRs)` : "N/A"}
            </span>
          </div>

          <div className="bg-[#2B2B2B] border border-[#4A4A4A] p-2 rounded flex flex-col justify-between">
            <span className="text-[9px] text-[#F7D6D0] uppercase tracking-widest font-semibold">CURRENT PERIOD</span>
            <span className="font-bold text-[#E2B4BD] mt-0.5 text-[11px]">
              {data && data.length > 0 ? `${data[data.length - 1].month} (${data[data.length - 1].total_crimes} FIRs)` : "N/A"}
            </span>
          </div>

          <div className="bg-[#2B2B2B] border border-[#4A4A4A] p-2 rounded flex flex-col justify-between">
            <span className="text-[9px] text-[#F7D6D0] uppercase tracking-widest font-semibold">MONTHLY AVG</span>
            <span className="font-bold text-white mt-0.5 text-[11px]">{avgMonthlyCases} FIRs/mo</span>
          </div>
        </div>

        {/* Main Area Chart Container */}
        <div className="h-[320px] w-full flex-1 min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 16, right: 16, left: -18, bottom: 0 }}
            >
              <defs>
                {/* Palette Linear Gradient */}
                <linearGradient id="colorMauveGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E2B4BD" stopOpacity={0.35} />
                  <stop offset="60%" stopColor="#d69ea9" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#F7D6D0" stopOpacity={0.0} />
                </linearGradient>

                <linearGradient id="colorCdrGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E2B4BD" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#F7D6D0" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorBankGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorEmailGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorChatGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F7D6D0" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#E2B4BD" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorApkGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f472b6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(247, 214, 208, 0.15)"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{ fill: "#A0A0A0", fontSize: 10, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />

              <YAxis
                tick={{ fill: "#A0A0A0", fontSize: 10, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              {viewMode === "category" && (
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    color: "#F7D6D0",
                    paddingBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                />
              )}

              {/* Render Single Overall Crime Trend in Mauve */}
              {viewMode === "total" ? (
                <Area
                  type="monotone"
                  name="Overall Incidents (Statewide)"
                  dataKey="total_crimes"
                  stroke="#E2B4BD"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorMauveGlow)"
                  dot={{ stroke: "#E2B4BD", strokeWidth: 2, fill: "#F7D6D0", r: 4 }}
                  activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2, fill: "#E2B4BD" }}
                  isAnimationActive={true}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              ) : (
                /* Render Category Breakdown Lines */
                <>
                  <Area
                    type="monotone"
                    name="CDR / IPDR"
                    dataKey="cdr_ipdr"
                    stroke="#E2B4BD"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCdrGlow)"
                    dot={{ stroke: "#E2B4BD", strokeWidth: 1.5, fill: "#d69ea9", r: 3 }}
                    activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#E2B4BD" }}
                    isAnimationActive={true}
                    animationDuration={800}
                    animationEasing="ease-out"
                  />

                  <Area
                    type="monotone"
                    name="Bank / UPI Logs"
                    dataKey="bank_upi"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBankGlow)"
                    dot={{ stroke: "#10b981", strokeWidth: 1.5, fill: "#047857", r: 3 }}
                    activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#10b981" }}
                    isAnimationActive={true}
                    animationDuration={950}
                    animationEasing="ease-out"
                  />

                  <Area
                    type="monotone"
                    name="Email Headers"
                    dataKey="email_headers"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEmailGlow)"
                    dot={{ stroke: "#f59e0b", strokeWidth: 1.5, fill: "#b45309", r: 3 }}
                    activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#f59e0b" }}
                    isAnimationActive={true}
                    animationDuration={1100}
                    animationEasing="ease-out"
                  />

                  <Area
                    type="monotone"
                    name="Chat Exports"
                    dataKey="chat_exports"
                    stroke="#F7D6D0"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorChatGlow)"
                    dot={{ stroke: "#F7D6D0", strokeWidth: 1.5, fill: "#E2B4BD", r: 3 }}
                    activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#F7D6D0" }}
                    isAnimationActive={true}
                    animationDuration={1250}
                    animationEasing="ease-out"
                  />

                  <Area
                    type="monotone"
                    name="Android / APK Logs"
                    dataKey="android_apk"
                    stroke="#ec4899"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorApkGlow)"
                    dot={{ stroke: "#ec4899", strokeWidth: 1.5, fill: "#be185d", r: 3 }}
                    activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#ec4899" }}
                    isAnimationActive={true}
                    animationDuration={1400}
                    animationEasing="ease-out"
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
};

// Custom Chart Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2B2B2B] border border-[#E2B4BD]/50 p-2.5 rounded shadow-xl text-xs font-mono">
        <p className="font-bold text-white mb-1.5 border-b border-[#4A4A4A] pb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-bold text-white tabular-nums">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default TrendChart;