import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MinusCircle,
  Users,
  Briefcase,
  BarChart3,
  ChevronRight,
} from "lucide-react";

// Modern professional color palette
const STATUS_COLORS = {
  present: "#10B981", // Emerald green
  late: "#F59E0B", // Amber
  "half-day": "#F97316", // Orange
  excused: "#3B82F6", // Blue
  unexcused: "#EF4444", // Red
  "no-status": "#6B7280", // Gray
};

const STATUS_ICONS = {
  present: CheckCircle,
  late: Clock,
  "half-day": AlertCircle,
  excused: Award,
  unexcused: XCircle,
  "no-status": MinusCircle,
};

const STATUS_LABELS = {
  present: "Present",
  late: "Late",
  "half-day": "Half Day",
  excused: "Excused",
  unexcused: "Unexcused",
  "no-status": "No Status",
};

// Extended sample data with dates
const SAMPLE_ATTENDANCE = [
  {
    status: "present",
    date: "2024-03-01",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
  },
  {
    status: "present",
    date: "2024-03-02",
    checkIn: "09:15 AM",
    checkOut: "05:00 PM",
  },
  {
    status: "present",
    date: "2024-03-03",
    checkIn: "08:55 AM",
    checkOut: "05:00 PM",
  },
  {
    status: "late",
    date: "2024-03-04",
    checkIn: "10:30 AM",
    checkOut: "05:00 PM",
  },
  {
    status: "half-day",
    date: "2024-03-05",
    checkIn: "09:00 AM",
    checkOut: "01:00 PM",
  },
  { status: "excused", date: "2024-03-06", checkIn: null, checkOut: null },
  {
    status: "present",
    date: "2024-03-07",
    checkIn: "08:45 AM",
    checkOut: "05:00 PM",
  },
  { status: "unexcused", date: "2024-03-08", checkIn: null, checkOut: null },
  {
    status: "present",
    date: "2024-03-09",
    checkIn: "09:05 AM",
    checkOut: "05:00 PM",
  },
  {
    status: "present",
    date: "2024-03-10",
    checkIn: "08:50 AM",
    checkOut: "05:00 PM",
  },
];

const AttendanceTab = ({
  attendance = SAMPLE_ATTENDANCE,
  workingDaysPerWeek = 5,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("week"); // week, month, year

  // Calculate all metrics
  const metrics = useMemo(() => {
    const totalDays = attendance.length;

    // Count by status
    const counts = {
      present: 0,
      late: 0,
      "half-day": 0,
      excused: 0,
      unexcused: 0,
      "no-status": 0,
    };

    attendance.forEach((record) => {
      const status = record.status?.toLowerCase() || "no-status";
      if (counts[status] !== undefined) counts[status]++;
      else counts["no-status"]++;
    });

    // Calculate derived metrics
    const presentDays = counts.present;
    const lateDays = counts.late;
    const halfDays = counts["half-day"];
    const excusedDays = counts.excused;
    const unexcusedDays = counts.unexcused;

    // Total effective present days (present + half-day counts as 0.5)
    const effectivePresentDays = presentDays + halfDays * 0.5;

    // Total working days in period (excluding weekends based on actual dates)
    const weekends = attendance.filter((record) => {
      const date = new Date(record.date);
      const day = date.getDay();
      return day === 0 || day === 6;
    }).length;

    const totalWorkingDays = totalDays - weekends;
    const totalAbsentDays = unexcusedDays + lateDays * 0.5;

    // Attendance percentage based on working days
    const attendancePercentage =
      totalWorkingDays > 0
        ? ((effectivePresentDays / totalWorkingDays) * 100).toFixed(1)
        : 0;

    // Performance score (0-100)
    const performanceScore =
      totalWorkingDays > 0
        ? Math.min(
            100,
            (effectivePresentDays / totalWorkingDays) * 100 +
              lateDays * -2 +
              unexcusedDays * -5,
          )
        : 0;

    return {
      totalDays,
      totalWorkingDays,
      presentDays,
      lateDays,
      halfDays,
      excusedDays,
      unexcusedDays,
      effectivePresentDays,
      totalAbsentDays,
      attendancePercentage,
      performanceScore,
      counts,
    };
  }, [attendance]);

  // Prepare pie data
  const pieData = Object.entries(metrics.counts)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      name: key,
      value: value,
      label: STATUS_LABELS[key],
      color: STATUS_COLORS[key],
      percentage:
        metrics.totalDays > 0
          ? ((value / metrics.totalDays) * 100).toFixed(1)
          : 0,
    }));

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.9}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white px-4 py-2 rounded-xl shadow-xl text-sm backdrop-blur-sm">
          <p className="font-semibold">{data.label}</p>
          <p className="text-2xl font-bold mt-1">{data.value}</p>
          <p className="text-gray-400 text-xs">{data.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  // Stat Card Component
  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-600">{trend}</span>
            </div>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  );

  // Status Item Component
  const StatusItem = ({
    status,
    count,
    color,
    icon: Icon,
    percentage,
    onClick,
    isActive,
  }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-between p-3 rounded-xl transition-all duration-200 w-full
        ${isActive ? "bg-gray-50 ring-2 ring-offset-0" : "hover:bg-gray-50"}
      `}
      style={{ ringColor: color }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-4 h-4" style={{ color: color }} />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-700">{status}</p>
          <p className="text-xs text-gray-400">
            {count} day{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold" style={{ color: color }}>
          {percentage}%
        </p>
        <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-emerald-500" />
                Attendance Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Period Selector */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {["week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    selectedPeriod === period
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Working Days"
            value={metrics.totalWorkingDays}
            subtitle={`out of ${metrics.totalDays} total days`}
            icon={Briefcase}
            color="text-emerald-600"
            trend="Based on weekdays"
          />
          <StatCard
            title="Present Days"
            value={metrics.presentDays}
            subtitle={`+ ${metrics.halfDays} half days`}
            icon={CheckCircle}
            color="text-emerald-500"
          />
          <StatCard
            title="Absent Days"
            value={metrics.unexcusedDays}
            subtitle={`${metrics.lateDays} late days`}
            icon={XCircle}
            color="text-red-500"
          />
          <StatCard
            title="Attendance Rate"
            value={`${metrics.attendancePercentage}%`}
            subtitle={`${metrics.performanceScore} performance score`}
            icon={TrendingUp}
            color="text-blue-500"
            trend={`${metrics.attendancePercentage >= 75 ? "Excellent" : "Needs improvement"}`}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Distribution</h3>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                Total: {metrics.totalDays} days
              </div>
            </div>

            <div className="relative h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    cursor="pointer"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {metrics.attendancePercentage}%
                  </p>
                  <p className="text-xs text-gray-400">Attendance</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {metrics.effectivePresentDays.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500">Effective Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500">
                    {metrics.lateDays}
                  </p>
                  <p className="text-xs text-gray-500">Late Arrivals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status List Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Attendance Status</h3>
              <button className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View Details <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {pieData.map((item) => (
                <StatusItem
                  key={item.name}
                  status={item.label}
                  count={item.value}
                  color={item.color}
                  icon={STATUS_ICONS[item.name]}
                  percentage={item.percentage}
                  isActive={
                    activeIndex ===
                    pieData.findIndex((i) => i.name === item.name)
                  }
                  onClick={() =>
                    setActiveIndex(
                      pieData.findIndex((i) => i.name === item.name),
                    )
                  }
                />
              ))}
            </div>

            {/* Performance Note */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Performance Summary
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {metrics.attendancePercentage >= 90
                        ? "Excellent attendance! You're showing great consistency. Keep up the good work!"
                        : metrics.attendancePercentage >= 75
                          ? "Good attendance. Try to reduce late arrivals to improve your score."
                          : "Your attendance needs improvement. Consider setting reminders for daily check-in."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Footer */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Present: {metrics.presentDays}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Late: {metrics.lateDays}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Unexcused: {metrics.unexcusedDays}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Excused: {metrics.excusedDays}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last updated: Today, 09:00 AM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTab;
