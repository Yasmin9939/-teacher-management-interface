'use client';

import { useRouter, useParams } from 'next/navigation';
import { useTeachers } from '@/lib/TeacherContext';
import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';

export default function PayTeacherPage() {
  const { id } = useParams();
  const { teachers } = useTeachers();
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    const found = teachers.find(t => t.id === id);
    setTeacher(found);
  }, [id, teachers]);

  if (!teacher) return <p className="p-4">Loading...</p>;

  const presentDays = teacher.attendance.length;
  const totalDays = 30;
  const payable = Math.floor((presentDays / totalDays) * teacher.salary);
  const upiLink = `upi://pay?pa=${teacher.upi}&pn=${encodeURIComponent(teacher.name)}&am=${payable}&cu=INR`;

  const handleDone = () => {
    const stored = localStorage.getItem('paidMap');
    const paidMap = stored ? JSON.parse(stored) : {};
    paidMap[teacher.id] = true;
    localStorage.setItem('paidMap', JSON.stringify(paidMap));
    router.push('/salary');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow text-center space-y-4">
        <h2 className="text-xl font-bold">Scan to Pay</h2>
        <QRCode value={upiLink} size={180} />
        <div className="text-left text-sm space-y-1">
          <p><strong>Name:</strong> {teacher.name}</p>
          <p><strong>UPI:</strong> {teacher.upi}</p>
          <p><strong>Base Salary:</strong> ₹{teacher.salary}</p>
          <p><strong>Attendance:</strong> {presentDays} / {totalDays}</p>
          <p><strong>Payable:</strong> ₹{payable}</p>
        </div>
        <button
          onClick={handleDone}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Done & Return to Salary Page
        </button>
      </div>
    </div>
  );
}
