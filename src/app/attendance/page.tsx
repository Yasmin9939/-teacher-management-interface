'use client';

import { useState } from 'react';
import { useTeachers } from '@/lib/TeacherContext';

export default function AttendancePage() {
  const { teachers, recordAttendance } = useTeachers();
  const todayDefault = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(todayDefault);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800">Record Attendance</h2>
      <div className="flex items-center space-x-4">
        <label htmlFor="date" className="font-medium text-gray-700">
          Date:
        </label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ul className="space-y-3">
        {teachers.map((t) => {
          const rec = t.attendance.find((a) => a.date === selectedDate);
          const present = rec?.present ?? false;
          return (
            <li
              key={t.id}
              className="flex items-center justify-between p-3 border rounded hover:shadow-sm transition"
            >
              <span>{t.name}</span>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={present}
                  onChange={(e) =>
                    recordAttendance(selectedDate, t.id, e.target.checked)
                  }
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <span>{present ? 'Present' : 'Absent'}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
