'use client';

import { useTeachers } from '@/lib/TeacherContext';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SalaryPage() {
  const { teachers, getPaymentRecord } = useTeachers();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Pay Salaries</h2>
      <table className="w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Base</th>
            <th className="p-2 text-left">Attd</th>
            <th className="p-2 text-left">Due</th>
            <th className="p-2 text-left">Paid</th>
            <th className="p-2 text-left">Pending</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => {
            const presentDays = t.attendance.filter((a) => a.present).length;
            const due = Math.floor((presentDays / 30) * t.salary);
            const { paidAmount } = getPaymentRecord(t.id);
            const pending = due - paidAmount;

            return (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.name}</td>
                <td className="p-2">₹{t.salary}</td>
                <td className="p-2">{presentDays}/30</td>
                <td className="p-2">₹{due}</td>
                <td className="p-2">₹{paidAmount}</td>
                <td className={`p-2 ${pending > 0 ? 'text-red-500' : 'text-green-600'}`}>
                  ₹{pending}
                </td>
                <td className="p-2">
                  {pending > 0 ? (
                    <Link
                      href={`/salary/pay/${t.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Pay ₹{pending}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-5 h-5" /> Done
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
