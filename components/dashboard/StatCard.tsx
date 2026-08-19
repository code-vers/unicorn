'use client';

import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  subText: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  change,
  subText,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  return (
    <div className="bg-white border-[#d3d3d3] border-[1.5px] border-solid p-5 rounded-[16px] flex flex-col gap-3 w-full shrink-0">
      <div className="flex items-start justify-between w-full">
        <div 
          className="rounded-[8px] flex items-center justify-center size-[38px]" 
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon size={18} color={iconColor} />
        </div>
        {change && (
          <div className="bg-[#ebf7ed] rounded-[20px] flex gap-[3px] items-center px-[6px] py-[2px]">
            <TrendingUp size={9} className="text-[#3fa34d]" />
            <span className="font-bold text-[#3fa34d] text-[12px] leading-[1.6]">
              {change}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-[6px]">
        <h2 className="font-bold text-[#0a1413] text-[28px] leading-[1.6]">
          {value}
        </h2>
        <div className="flex flex-col gap-0">
          <p className="font-bold text-[#6b7280] text-[12px] leading-[1.6]">
            {title}
          </p>
          <p className="text-[#9ca3af] text-[12px] leading-[1.6]">
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
}
