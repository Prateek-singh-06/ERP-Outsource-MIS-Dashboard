import React from "react";
type ColorKey = "blue" | "purple" | "green" | "red" | "orange" | "indigo";
type IconKey = "money" | "vendor" | "payment" | "billing"|"package"|"credit";
type StatusColorKey = "green" | "red" | "yellow" | "blue" | "purple" | "orange";
type RegoFinancialCardProps = {
  title: string;
  amount: number|undefined;
  month?: string|undefined;
  statusColor?: "green" | "red" | "yellow" | "blue" | "purple" | "orange";
  icon?: IconKey;
  gradientFrom?: string;
  gradientTo?: string;
};

const RegoFinancialCard = ({
  title,
  amount,
  statusColor,
  icon,
  gradientFrom ,
  gradientTo,
}: RegoFinancialCardProps) => {
  // Icon components
  const icons: Record<IconKey, React.ReactElement> = {
    money: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
    ),
    vendor: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    package: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    payment: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2z"
        />
      </svg>
    ),
    credit: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    billing: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  // Color configurations
  const colorConfig: Record<
    ColorKey,
    {
      from: string;
      to: string;
      textFrom: string;
      textTo: string;
      bg: string;
      textColor: string;
      labelColor: string;
    }
  > = {
    blue: {
      from: "from-blue-500",
      to: "to-blue-600",
      textFrom: "from-blue-600",
      textTo: "to-blue-700",
      bg: "from-blue-50 to-blue-100",
      textColor: "text-blue-800",
      labelColor: "text-blue-600",
    },
    purple: {
      from: "from-purple-500",
      to: "to-purple-600",
      textFrom: "from-purple-600",
      textTo: "to-purple-700",
      bg: "from-purple-50 to-purple-100",
      textColor: "text-purple-800",
      labelColor: "text-purple-600",
    },
    green: {
      from: "from-green-500",
      to: "to-green-600",
      textFrom: "from-green-600",
      textTo: "to-green-700",
      bg: "from-green-50 to-green-100",
      textColor: "text-green-800",
      labelColor: "text-green-600",
    },
    red: {
      from: "from-red-500",
      to: "to-red-600",
      textFrom: "from-red-600",
      textTo: "to-red-700",
      bg: "from-red-50 to-red-100",
      textColor: "text-red-800",
      labelColor: "text-red-600",
    },
    orange: {
      from: "from-orange-500",
      to: "to-orange-600",
      textFrom: "from-orange-600",
      textTo: "to-orange-700",
      bg: "from-orange-50 to-orange-100",
      textColor: "text-orange-800",
      labelColor: "text-orange-600",
    },
    indigo: {
      from: "from-indigo-500",
      to: "to-indigo-600",
      textFrom: "from-indigo-600",
      textTo: "to-indigo-700",
      bg: "from-indigo-50 to-indigo-100",
      textColor: "text-indigo-800",
      labelColor: "text-indigo-600",
    },
  };

  // Status color mapping
  const statusColors: Record<StatusColorKey, string> = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  const fromColor = colorConfig[gradientFrom as ColorKey] || colorConfig.blue;
  const toColor = colorConfig[gradientTo as ColorKey] || colorConfig.purple;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative group">
        {/* Glowing background effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${
            fromColor.from
          } via-${toColor.from.split("-")[1]}-600 ${
            toColor.to
          } rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}
        ></div>

        {/* Main card */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl w-full max-w-2xl">
          {/* Header with icon and status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <div
                className={`p-3 bg-gradient-to-br ${fromColor.from} ${toColor.to} rounded-xl shadow-lg`}
              >
                {icons[icon as IconKey] || icons.billing}
              </div>
              <h2
                className={`text-xl font-bold bg-gradient-to-r ${fromColor.textFrom} ${toColor.textTo} bg-clip-text text-transparent`}
              >
                {title}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 ${
                  statusColors[statusColor as StatusColorKey]
                } rounded-full animate-pulse`}
              ></div>
              <span className="text-sm text-gray-500 font-medium">
                {status}
              </span>
            </div>
          </div>

          {/* Main content - Amount and details */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xl font-black text-gray-800 mb-2 tracking-tight">
                ₹ {amount?.toLocaleString("en-IN")}
              </div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                Indian Rupees
              </div>
            </div>

            {/* <div className="flex items-center space-x-4 ml-8">
              <div
                className={`text-center p-3 bg-gradient-to-br ${fromColor.bg} rounded-xl`}
              >
                <div
                  className={`text-xs ${fromColor.labelColor} font-semibold uppercase tracking-wide mb-1`}
                >
                  {month}
                </div>
                <div className={`text-sm font-bold ${fromColor.textColor}`}>
                  Period
                </div>
              </div>
              <div
                className={`text-center p-3 bg-gradient-to-br ${toColor.bg} rounded-xl`}
              >
                <div
                  className={`text-xs ${toColor.labelColor} font-semibold uppercase tracking-wide mb-1`}
                >
                  Status
                </div>
                <div className={`text-sm font-bold ${toColor.textColor}`}>
                  {status}
                </div>
              </div>
            </div> */}
          </div>

          {/* Bottom accent */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
              fromColor.from
            } via-${toColor.from.split("-")[1]}-500 ${
              toColor.to
            } rounded-b-2xl`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RegoFinancialCard;
