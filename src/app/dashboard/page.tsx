'use client';

import DashboardCard from '@/Components/DashboardCard';
import { Users, Wallet, CalendarCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! What would you like to manage today?</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <DashboardCard title="Manage Teachers" href="/teachers" icon={Users} color="blue" />
          <DashboardCard title  ="Manage Salaries" href="/salary" icon={Wallet} color="green" />
          <DashboardCard title="Record Attendance" href="/attendance" icon={CalendarCheck} color="yellow" />
        </div>
      </div>
    </div>
  );
}
