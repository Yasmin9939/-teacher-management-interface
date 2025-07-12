'use client';
import Link from 'next/link';
import TeacherCard from '../../Components/TeacherCard';
import { useTeachers } from '../../lib/TeacherContext';

export default function TeachersPage() {
  const { teachers, deleteTeacher } = useTeachers();

  return (
    <div className="space-y-6 px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Teachers</h2>
        <Link
          href="/teachers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add New Teacher
        </Link>
      </div>

      <div className="m-[40px] flex flex-wrap gap-[40px] justify-start">
        {teachers.map((t) => (
          <TeacherCard key={t.id} teacher={t} onDelete={() => deleteTeacher(t.id)} />
        ))}
      </div>
    </div>
  );
}
