'use client';

import { useTeachers } from '../../lib/TeacherContext';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type PaidStatus = Record<string, boolean>;

export default function SalaryPage() {
  const { teachers } = useTeachers();
  const [paidMap, setPaidMap] = useState<PaidStatus>({});

  useEffect(() => {
    const stored = localStorage.getItem('paidMap');
    if (stored) setPaidMap(JSON.parse(stored));
  }, []);

  const handlePrint = (teacher: any, presentDays: number, totalDays: number) => {
    const payable = Math.floor((presentDays / totalDays) * teacher.salary);
    const content = `
      <div>
        <h2 style="text-align:center;">Salary Slip</h2>
        <p><strong>Name:</strong> ${teacher.name}</p>
        <p><strong>UPI:</strong> ${teacher.upi}</p>
        <p><strong>Base Salary:</strong> ₹${teacher.salary}</p>
        <p><strong>Attendance:</strong> ${presentDays} / ${totalDays}</p>
        <p><strong>Payable:</strong> ₹${payable}</p>
      </div>
    `;
    const printWindow = window.open('', '', 'width=600,height=600');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>Salary Slip</title></head><body>${content}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-gray-800">Pay Salaries</h2>
      <table className="min-w-full bg-white border rounded shadow text-sm">
        <thead>
          <tr className="bg-gray-100 text-left font-semibold">
            <th className="p-3">Name</th>
            <th className="p-3">Base Salary</th>
            <th className="p-3">Attendance</th>
            <th className="p-3">Payable</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(t => {
            const presentDays = t.attendance.length;
            const totalDays = 30;
            const payable = Math.floor((presentDays / totalDays) * t.salary);
            const isPaid = paidMap[t.id];

            return (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.name}</td>
                <td className="p-3">₹{t.salary}</td>
                <td className="p-3">{presentDays} / {totalDays}</td>
                <td className="p-3 font-medium">₹{payable}</td>
                <td className="p-3">
                  {isPaid ? (
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle2 className="w-5 h-5" /> Paid
                    </div>
                  ) : (
                    <span className="text-red-500 font-medium">Unpaid</span>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {!isPaid ? (
                    <Link
                      href={`/salary/pay/${t.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Pay Now
                    </Link>
                  ) : (
                    <button
                      onClick={() => handlePrint(t, presentDays, totalDays)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Print Slip
                    </button>
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
