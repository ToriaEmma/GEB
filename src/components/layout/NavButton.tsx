"use client";

import React from 'react';
import { ListIcon, XIcon } from '@phosphor-icons/react';

interface NavButtonProps {
  onClick: () => void;
  scrolled: boolean;
  icon: 'menu' | 'close';
  ariaLabel: string;
}

export const NavButton = ({ onClick, scrolled, icon, ariaLabel }: NavButtonProps) => {
  const baseClasses = icon === 'menu' ? 'p-2.5 lg:hidden rounded-full backdrop-blur-md transition-colors' : 'p-3 rounded-full transition-colors';
  const IconComponent = icon === 'menu' ? ListIcon : XIcon;
  const size = 20;
  const classes = scrolled 
    ? `${baseClasses} text-white bg-white/5 hover:bg-white/10 border border-white/10` 
    : `${baseClasses} text-black bg-[#4471c4]/20 hover:bg-[#4471c4]/30 border border-[#4471c4]/30`;

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel}>
      <IconComponent size={size} weight='bold' />
    </button>
  );
};

