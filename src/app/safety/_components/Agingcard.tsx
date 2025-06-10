import React from 'react';
import { cn } from '@/lib/utils';

interface AgingCardProps {
  title: string;
  closedAge: {
    value: number;
    label?: string;
  };
  openAge: {
    value: number;
    label?: string;
  };
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const AgingCard: React.FC<AgingCardProps> = ({
  title,
  closedAge,
  openAge,
  subtitle,
  icon,
  className
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1",
        "dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-gray-900/20 h-full",
        className
      )}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-950/20 dark:to-purple-950/20" />
      
      {/* Content Container with proper padding */}
      <div className="relative z-10 p-6 pb-8">
        {/* Header with icon */}
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
        </div>

        {/* Aging Data Section - Compact Layout */}
        <div className=" grid grid-cols-2 gap-4">
          {/* Closed Issues Age */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 transition-colors duration-300 group-hover:bg-green-100 dark:group-hover:bg-green-900/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-400">
                  {closedAge.label || 'Closed'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-700 dark:text-green-400 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-300">
                {closedAge.value}
              </p>
              
            </div>
          </div>

          {/* Open Issues Age */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 transition-colors duration-300 group-hover:bg-red-100 dark:group-hover:bg-red-900/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div>
                <p className="text-xs font-medium text-red-700 dark:text-red-400">
                  {openAge.label || 'Open'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-red-700 dark:text-red-400 transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-300">
                {openAge.value}
              </p>
              
            </div>
          </div>
        </div>
      </div>
      {/* Comparison Indicator */}
      {/* <div className=' pt-4 border-t border-gray-200 dark:border-gray-800'>
        <div className="flex items-center justify-center text-xs space-x-2 dark:text-gray-400">
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Resolution</span>
              <span className={cn(
                "font-medium",
                closedAge.value < openAge.value 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-yellow-600 dark:text-yellow-400"
              )}>
                {closedAge.value < openAge.value ? "Efficient" : "Needs Attention"}
              </span>
            </div>
            </div>
        </div> */}


      {/* Animated border bottom - positioned outside content container */}
     <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-100 to-purple-500 transition-all duration-500 group-hover:w-full`}/>
    </div>
  );
};