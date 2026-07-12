/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GreenageLogoProps {
  theme?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export default function GreenageLogo({ theme = 'dark', className = 'h-10', showText = true }: GreenageLogoProps) {
  const textColor = theme === 'dark' ? '#FFFFFF' : '#111827';
  
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      <svg 
        viewBox="0 0 50 60" 
        className="h-full w-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head: green vertical oval */}
        <ellipse 
          cx="25" 
          cy="14" 
          rx="4.5" 
          ry="7" 
          fill="#3b82f6" 
          className="fill-emerald-600 dark:fill-emerald-500"
        />
        
        {/* Arms: curved green branches stretching up and out */}
        <path 
          d="M 6,18 C 14,27 20,29 25,29 C 30,29 36,27 44,18" 
          stroke="currentColor" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          className="stroke-emerald-600 dark:stroke-emerald-500"
        />
        
        {/* Trunk: curved green stem curving down and to the left, then back slightly */}
        <path 
          d="M 25,29 C 23,39 19,45 23,52" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          className="stroke-emerald-600 dark:stroke-emerald-500"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col items-start justify-center">
          <span 
            className="font-display font-black text-xl leading-none tracking-tight transition-colors duration-300"
            style={{ color: textColor }}
          >
            GREENAGE
          </span>
          <span 
            className="font-display text-[10px] tracking-[0.25em] font-medium leading-none mt-1 text-emerald-600 dark:text-emerald-500"
          >
            TALENT HUB
          </span>
        </div>
      )}
    </div>
  );
}
