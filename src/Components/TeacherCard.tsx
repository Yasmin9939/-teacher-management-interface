'use client';
import { Teacher } from '../Types/teacher';

export default function TeacherCard({ teacher, onDelete }: { teacher: Teacher; onDelete: () => void }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-bold text-lg">{teacher.name}</h3>
      <p className="text-gray-600">{teacher.subject}</p>
      <p className="text-sm text-gray-500">{teacher.email}</p>
      <p className="text-sm text-gray-500">Salary: ₹{teacher.salary}</p>
      <p className="text-sm text-gray-500">UPI: {teacher.upi}</p>
      <button onClick={onDelete} className="mt-2 text-red-600 hover:underline">Delete</button>
    </div>
  );
}