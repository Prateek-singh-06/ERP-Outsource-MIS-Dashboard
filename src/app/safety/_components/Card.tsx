import React from 'react';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: {
    value: number;
    max?: number;
    label?: string;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  };
  hoverEffect?:'blue' | 'green' | 'red' | 'yellow' | 'purple';
  className?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  progress,
  hoverEffect,
  className
}) => {
  // Calculate progress percentage
  const progressPercentage = progress ? Math.min((progress.value / (progress.max || 100)) * 100, 100) : 0;
  
  // Progress bar color variants
  const progressColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  const progressBgColors = {
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    red: 'bg-red-100 dark:bg-red-900/30',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30'
  };
  const gradientFromColors = {
  blue: "from-blue-100",
  green: "from-green-100",
  red: "from-red-100",
  yellow: "from-yellow-100",
  purple: "from-purple-100",
};
const gradientToColors = {
  blue: "to-blue-500",
  green: "to-green-500",
  red: "to-red-500",
  yellow: "to-yellow-500",
  purple: "to-purple-500",
};

  const selectedColor =(progress?.color || "blue");

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1",
        "dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-900/20 hover:cursor-pointer h-full",
        className
      )}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-950/20 dark:to-purple-950/20" />
      
      {/* Content Container with proper padding */}
      <div className="relative z-10 p-6 pb-8">
        {/* Header with icon and trend */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {trend && (
            <div className={cn(
              "flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium",
              trend.isPositive 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}>
              <span className={cn(
                "text-xs",
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {trend.isPositive ? "↗" : "↘"}
              </span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Main value */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {progress.label || 'Progress'}
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {progress.value}{progress.max ? `/${progress.max}` : '%'}
              </span>
            </div>
            <div className={cn(
              "w-full rounded-full h-2.5 transition-all duration-300",
              progressBgColors[selectedColor]
            )}>
              <div 
                className={cn(
                  "h-2.5 rounded-full transition-all duration-700 ease-out",
                  progressColors[selectedColor]
                )}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* bg-gradient-to-r from-${hoverEffect}-500 to-${hoverEffect}-500 */}

      {/* Animated border bottom - positioned outside content container */}
      <div
  className={cn(
    "absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full",
    gradientFromColors[hoverEffect || "blue"],
    gradientToColors[hoverEffect || "blue"]
  )}
/>

      {/* <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-${hoverEffect}-100 to-${hoverEffect}-500 transition-all duration-500  group-hover:w-full `}/> */}
    </div>
  );
};