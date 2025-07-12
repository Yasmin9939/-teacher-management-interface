'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'indigo'; // supported Tailwind colors
}

const colorMap = {
  red: {
    bg: 'bg-red-200 hover:bg-red-300',
    text: 'text-red-800'
  },
  blue: {
    bg: 'bg-blue-200 hover:bg-blue-300',
    text: 'text-blue-800'
  },
  green: {
    bg: 'bg-green-200 hover:bg-green-300',
    text: 'text-green-800'
  },
  yellow: {
    bg: 'bg-yellow-200 hover:bg-yellow-300',
    text: 'text-yellow-800'
  },
  purple: {
    bg: 'bg-purple-200 hover:bg-purple-300',
    text: 'text-purple-800'
  },
  indigo: {
    bg: 'bg-indigo-200 hover:bg-indigo-300',
    text: 'text-indigo-800'
  },
};

export default function DashboardCard({
  title,
  href,
  icon: Icon,
  color = 'red'
}: DashboardCardProps) {
  const { bg, text } = colorMap[color] || colorMap.red;

  return (
    <Link href={href} className={`block rounded-xl shadow-md transition ${bg} ${text} `}>
      <div className={`flex flex-col items-center justify-center h-[150px] text-center px-4`}>
        <Icon className="w-10 h-10 mb-2" />
        <span className="text-lg font-semibold">{title}</span>
      </div>
    </Link>
  );
}
