'use client';
import '../styles/globals.css'; // or wherever your CSS is

import DashboardCard from '@/Components/DashboardCard';
import { Users, Wallet, CalendarCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="">
      <div className="">
        <div className="flex flex-col gap-7 justify-center  ">
          <DashboardCard title="Manage Teachers" href="/teachers" icon={Users} color="blue" />
          <DashboardCard title  ="Manage Salaries" href="/salary" icon={Wallet} color="green" />
          <DashboardCard title="Record Attendance" href="/attendance" icon={CalendarCheck} color="yellow" />
        </div>
      </div>
    </div>
  );
}
