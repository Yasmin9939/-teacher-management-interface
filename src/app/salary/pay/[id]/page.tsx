'use client';

import { useRouter, useParams } from 'next/navigation';
import { useTeachers, Teacher, AttendanceRecord } from '@/lib/TeacherContext';
import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';

export default function PayTeacherPage() {
  const { id } = useParams();
  const { teachers, payTeacher, getPaymentRecord } = useTeachers();
  const router = useRouter();

  // State now typed as Teacher or null
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    // Find and set the typed Teacher object
    const found = teachers.find((t) => t.id === id) ?? null;
    setTeacher(found);
  }, [id, teachers]);

  if (!teacher) {
    return <p className="p-4">Loading...</p>;
  }

  // Filter attendance with a properly typed parameter
  const presentDays = teacher.attendance.filter(
    (a: AttendanceRecord) => a.present
  ).length;

  const due = Math.floor((presentDays / 30) * teacher.salary);
  const { paidAmount } = getPaymentRecord(teacher.id);
  const pending = Math.max(0, due - paidAmount);

  const upiLink = [
    `upi://pay?pa=${teacher.upi}`,
    `pn=${encodeURIComponent(teacher.name)}`,
    `am=${pending}`,
    `cu=INR`
  ].join('&');

  const handleDone = () => {
    payTeacher(teacher.id);
    router.replace('/salary');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow text-center space-y-4">
        <h2 className="text-xl font-bold">Scan to Pay ₹{pending}</h2>
        <QRCode value={upiLink} size={180} />
        <button
          onClick={handleDone}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Done & Return
        </button>
      </div>
    </div>
  );
}
