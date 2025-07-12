
'use client';
import { useTeachers } from '@/lib/TeacherContext';

export default function AttendancePage() {
  const { teachers, recordAttendance } = useTeachers();

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Record Attendance - {today}</h2>
      {teachers.map(t => (
        <div key={t.id} className="flex items-center justify-between">
          <span>{t.name}</span>
          <button
            className="btn bg-blue-500 p-2 text-white rounded"
            onClick={() => recordAttendance(today, t.id, true)}
          >
            Mark Present
          </button>
        </div>
      ))}
    </div>
  );
}
