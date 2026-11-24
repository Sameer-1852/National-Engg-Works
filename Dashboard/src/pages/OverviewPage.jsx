import React, { useState, useMemo } from "react";
import {
  Cog,
  FolderTree,
  MessageSquare,
  Clock,
  Upload,
  Edit3,
  Trash2,
  Eye,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle2,
  Layers,
  ChevronRight,
} from "lucide-react";

const OverviewPage = ({
  products = [],
  categories = [],
  enquiries = [],
  setActiveTab,
  setEnquiryStatusFilter,
  openAddProductModal,
  openEditProductModal,
  handleDeleteProduct,
  deletingId,
  setSelectedEnquiry,
  getStatusBadge,
}) => {
  const [chartType, setChartType] = useState("area"); // "area" or "bar"
  const [hoveredDay, setHoveredDay] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // 1. Process Last 7 Days Activity Trend
  const last7DaysData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const label = d.toLocaleDateString("en-US", { weekday: "short" });
      const fullDate = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Match enquiries submitted on this specific calendar day
      const count = enquiries.filter((e) => {
        if (!e.createdAt) return false;
        const ed = new Date(e.createdAt);
        return (
          ed.getFullYear() === d.getFullYear() &&
          ed.getMonth() === d.getMonth() &&
          ed.getDate() === d.getDate()
        );
      }).length;

      days.push({ label, fullDate, count });
    }
    return days;
  }, [enquiries]);

  // 2. Process Products Distribution by Category
  const categoryDistribution = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const cat = p.category || "General Machinery";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const total = products.length || 1;
    const palette = [
      "#d97706", // Amber 600
      "#2563eb", // Blue 600
      "#10b981", // Emerald 500
      "#8b5cf6", // Violet 500
      "#06b6d4", // Cyan 500
      "#f43f5e", // Rose 500
      "#eab308", // Yellow 500
    ];

    return Object.entries(counts).map(([name, count], idx) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
      color: palette[idx % palette.length],
    }));
  }, [products]);

  // 3. Process Status Pipeline
  const statusPipeline = useMemo(() => {
    const counts = {
      New: 0,
      Pending: 0,
      "In Progress": 0,
      Completed: 0,
    };
    enquiries.forEach((e) => {
      const st = e.status || "New";
      counts[st] = (counts[st] || 0) + 1;
    });
    const total = enquiries.length || 1;
    return [
      {
        status: "New",
        label: "New / Unread",
        count: counts.New,
        percentage: Math.round((counts.New / total) * 100),
        color: "bg-blue-500",
        barBg: "bg-blue-100",
      },
      {
        status: "Pending",
        label: "Pending Review",
        count: counts.Pending,
        percentage: Math.round((counts.Pending / total) * 100),
        color: "bg-amber-500",
        barBg: "bg-amber-100",
      },
      {
        status: "In Progress",
        label: "In Progress / Active",
        count: counts["In Progress"],
        percentage: Math.round((counts["In Progress"] / total) * 100),
        color: "bg-violet-500",
        barBg: "bg-violet-100",
      },
      {
        status: "Completed",
        label: "Completed / Resolved",
        count: counts.Completed,
        percentage: Math.round((counts.Completed / total) * 100),
        color: "bg-emerald-500",
        barBg: "bg-emerald-100",
      },
    ];
  }, [enquiries]);

  // Chart Dimensions for SVG
  const chartW = 540;
  const chartH = 180;
  const padX = 35;
  const padY = 25;
  const maxDayCount = Math.max(...last7DaysData.map((d) => d.count), 4);

  // SVG Area / Line coordinates calculation
  const chartPoints = last7DaysData.map((d, i) => {
    const x = padX + (i * (chartW - 2 * padX)) / (last7DaysData.length - 1);
    const y = chartH - padY - (d.count / maxDayCount) * (chartH - 2 * padY);
    return { ...d, x, y };
  });

  const lineD = chartPoints.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${lineD} L ${chartPoints[chartPoints.length - 1].x} ${chartH - padY
    } L ${chartPoints[0].x} ${chartH - padY} Z`;

  // SVG Donut calculation
  const donutR = 54;
  const donutCircum = 2 * Math.PI * donutR;
  let cumulativePercent = 0;

  return (
    <div className="space-y-6">
      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => setActiveTab("products")}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-[#d97706] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>TOTAL PRODUCTS</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 group-hover:bg-amber-100 border border-amber-200 flex items-center justify-center transition-colors">
              <Cog className="w-4 h-4 text-[#d97706]" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0f172a] mt-2">
            {products.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span>Click to Manage Catalog</span>
            <ChevronRight className="w-3 h-3 text-[#d97706]" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab("categories")}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-blue-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>TOTAL CATEGORIES</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 border border-blue-200 flex items-center justify-center transition-colors">
              <FolderTree className="w-4 h-4 text-[#2563eb]" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0f172a] mt-2">
            {categories.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span>Click to Add Category</span>
            <ChevronRight className="w-3 h-3 text-[#2563eb]" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab("contacts")}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>CONTACT US &amp; RFQs</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center transition-colors">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0f172a] mt-2">
            {enquiries.length}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>● Live Client Submissions</span>
            <ChevronRight className="w-3 h-3 text-emerald-600" />
          </div>
        </div>

        <div
          onClick={() => {
            setEnquiryStatusFilter("New");
            setActiveTab("contacts");
          }}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-[#d97706] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>NEW / UNREAD INQUIRIES</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 group-hover:bg-amber-100 border border-amber-200 flex items-center justify-center transition-colors">
              <Clock className="w-4 h-4 text-[#d97706]" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#d97706] mt-2">
            {
              enquiries.filter(
                (e) => e.status === "New" || e.status === "Pending"
              ).length
            }
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span>Awaiting Engineering Response</span>
            <ChevronRight className="w-3 h-3 text-[#d97706]" />
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* DATA REPRESENTATION WITH GRAPHS & CHARTS SECTION                      */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GRAPH 1: 7-Day Inquiries Activity Graph (Area / Bar Chart) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5 text-[10.5px] font-mono-tech uppercase font-bold text-[#d97706]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>ACTIVITY VOLUME TREND</span>
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] mt-0.5">
                  Client Inquiries &amp; Quotation Requests
                </h3>
                <p className="text-xs text-slate-500">
                  Daily submission velocity across the last 7 calendar days
                </p>
              </div>

              {/* Chart Type Toggle Button */}
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setChartType("area")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-mono-tech font-bold text-[11px] transition-all cursor-pointer ${chartType === "area"
                    ? "bg-white text-[#0f172a] shadow-2xs"
                    : "text-slate-500 hover:text-[#0f172a]"
                    }`}
                >
                  <Activity className="w-3 h-3 text-[#d97706]" />
                  <span>Trend Line</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChartType("bar")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-mono-tech font-bold text-[11px] transition-all cursor-pointer ${chartType === "bar"
                    ? "bg-white text-[#0f172a] shadow-2xs"
                    : "text-slate-500 hover:text-[#0f172a]"
                    }`}
                >
                  <BarChart3 className="w-3 h-3 text-[#d97706]" />
                  <span>Bars</span>
                </button>
              </div>
            </div>

            {/* SVG Interactive Chart Render */}
            <div className="relative pt-6">
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full h-48 overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="activityGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                    <stop offset="90%" stopColor="#d97706" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines */}
                {[0, 0.33, 0.66, 1].map((pct, idx) => {
                  const y =
                    chartH - padY - pct * (chartH - 2 * padY);
                  return (
                    <g key={idx}>
                      <line
                        x1={padX}
                        y1={y}
                        x2={chartW - padX}
                        y2={y}
                        stroke="#f1f5f9"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={padX - 8}
                        y={y + 3.5}
                        fontSize="9"
                        fill="#94a3b8"
                        textAnchor="end"
                        className="font-mono-tech"
                      >
                        {Math.round(pct * maxDayCount)}
                      </text>
                    </g>
                  );
                })}

                {/* Render Mode: Smooth Area Curve */}
                {chartType === "area" && (
                  <>
                    <path d={areaD} fill="url(#activityGradient)" />
                    <path
                      d={lineD}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {chartPoints.map((pt, i) => (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={hoveredDay === i ? 6 : 4}
                          className="fill-white stroke-[#d97706] stroke-2 transition-all cursor-pointer"
                          onMouseEnter={() => setHoveredDay(i)}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                        {/* Day Label */}
                        <text
                          x={pt.x}
                          y={chartH - 6}
                          fontSize="10"
                          fill={hoveredDay === i ? "#0f172a" : "#64748b"}
                          fontWeight={hoveredDay === i ? "bold" : "normal"}
                          textAnchor="middle"
                          className="font-mono-tech"
                        >
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </>
                )}

                {/* Render Mode: Bar Chart */}
                {chartType === "bar" &&
                  chartPoints.map((pt, i) => {
                    const barW = 28;
                    const barH =
                      (pt.count / maxDayCount) * (chartH - 2 * padY);
                    const barY = chartH - padY - barH;
                    const isHovered = hoveredDay === i;

                    return (
                      <g
                        key={i}
                        className="cursor-pointer transition-opacity"
                        onMouseEnter={() => setHoveredDay(i)}
                        onMouseLeave={() => setHoveredDay(null)}
                      >
                        <rect
                          x={pt.x - barW / 2}
                          y={barY}
                          width={barW}
                          height={Math.max(barH, 3)}
                          rx="4"
                          fill={isHovered ? "#b45309" : "#d97706"}
                          className="transition-colors"
                        />
                        {/* Value top label */}
                        <text
                          x={pt.x}
                          y={barY - 5}
                          fontSize="9.5"
                          fontWeight="bold"
                          fill={isHovered ? "#d97706" : "#64748b"}
                          textAnchor="middle"
                          className="font-mono-tech"
                        >
                          {pt.count}
                        </text>
                        {/* Day Label */}
                        <text
                          x={pt.x}
                          y={chartH - 6}
                          fontSize="10"
                          fill={isHovered ? "#0f172a" : "#64748b"}
                          fontWeight={isHovered ? "bold" : "normal"}
                          textAnchor="middle"
                          className="font-mono-tech"
                        >
                          {pt.label}
                        </text>
                      </g>
                    );
                  })}
              </svg>

              {/* Active Hover Tooltip */}
              {hoveredDay !== null && (
                <div className="absolute top-2 right-4 bg-[#0d1829] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-mono-tech flex items-center gap-2 animate-in fade-in duration-150">
                  <span className="text-amber-400 font-bold">
                    {chartPoints[hoveredDay].fullDate}:
                  </span>
                  <span className="font-extrabold text-white">
                    {chartPoints[hoveredDay].count} Inquiries
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Activity Trend Bottom Stats Bar */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <div className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">
                7-DAY TOTAL
              </div>
              <div className="text-lg font-extrabold text-[#0f172a] mt-0.5">
                {last7DaysData.reduce((acc, d) => acc + d.count, 0)}
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <div className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">
                DAILY AVERAGE
              </div>
              <div className="text-lg font-extrabold text-[#d97706] mt-0.5">
                {(
                  last7DaysData.reduce((acc, d) => acc + d.count, 0) / 7
                ).toFixed(1)}
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg">
              <div className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">
                PEAK VOLUME
              </div>
              <div className="text-lg font-extrabold text-emerald-600 mt-0.5">
                {Math.max(...last7DaysData.map((d) => d.count))} / Day
              </div>
            </div>
          </div>
        </div>

        {/* GRAPH 2: Products by Category (SVG Donut Chart & Legend) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5 text-[10.5px] font-mono-tech uppercase font-bold text-[#2563eb]">
                  <PieChart className="w-3.5 h-3.5" />
                  <span>CATALOG DISTRIBUTION</span>
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] mt-0.5">
                  Products by Industry Category
                </h3>
              </div>
              <span className="text-xs font-mono-tech text-slate-400 font-bold">
                {products.length} Items
              </span>
            </div>

            {/* Donut Chart Visual & Center Stat */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-5">
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                  {categoryDistribution.length === 0 ? (
                    <circle
                      cx="70"
                      cy="70"
                      r={donutR}
                      fill="transparent"
                      stroke="#e2e8f0"
                      strokeWidth="16"
                    />
                  ) : (
                    categoryDistribution.map((slice, idx) => {
                      const strokeDash = (slice.percentage / 100) * donutCircum;
                      const strokeOffset =
                        (cumulativePercent / 100) * donutCircum;
                      cumulativePercent += slice.percentage;

                      return (
                        <circle
                          key={idx}
                          cx="70"
                          cy="70"
                          r={donutR}
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth="15"
                          strokeDasharray={`${strokeDash} ${donutCircum}`}
                          strokeDashoffset={-strokeOffset}
                          className="transition-all cursor-pointer hover:opacity-85"
                          onMouseEnter={() => setHoveredCategory(slice)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        />
                      );
                    })
                  )}
                </svg>

                {/* Center Text inside Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-extrabold text-[#0f172a]">
                    {hoveredCategory ? hoveredCategory.count : products.length}
                  </span>
                  <span className="text-[10px] font-mono-tech text-slate-500 uppercase font-bold">
                    {hoveredCategory ? "In Category" : "Products"}
                  </span>
                </div>
              </div>

              {/* Interactive Legend List */}
              <div className="flex-1 w-full space-y-2">
                {categoryDistribution.slice(0, 4).map((cat, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredCategory(cat)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer ${hoveredCategory?.name === cat.name
                      ? "bg-slate-100"
                      : "hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-semibold text-slate-800 truncate">
                        {cat.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 font-mono-tech">
                      <span className="font-bold text-[#0f172a]">{cat.count}</span>
                      <span className="text-slate-400 text-[10.5px]">
                        ({cat.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono-tech">
              Categories Active:{" "}
              <strong className="text-[#0f172a]">{categories.length}</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className="font-bold text-[#d97706] hover:underline"
            >
              Manage Catalog &rarr;
            </button>
          </div>
        </div>

        {/* GRAPH 3: Status Pipeline & Inquiries Progress Bar Graph */}
        <div className="lg:col-span-12 bg-white rounded-xl p-6 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-[10.5px] font-mono-tech uppercase font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>INQUIRY STATUS PIPELINE</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0f172a] mt-0.5">
                Conversion Pipeline &amp; Resolution Progress
              </h3>
            </div>
            <span className="text-xs font-mono-tech text-slate-400 font-bold">
              Total Recorded: {enquiries.length}
            </span>
          </div>

          {/* Horizontal Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
            {statusPipeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    {item.label}
                  </span>
                  <span className="font-mono-tech font-extrabold text-[#0f172a] text-sm">
                    {item.count}
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${Math.max(item.percentage, 3)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10.5px] font-mono-tech text-slate-400">
                  <span>Share of total</span>
                  <span className="font-bold text-slate-700">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
