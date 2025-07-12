'use client';
import Link from 'next/link';
import { useTeachers } from '@/lib/TeacherContext';
import TeacherCard from '@/Components/TeacherCard';

export default function TeachersPage() {
  const { teachers, deleteTeacher } = useTeachers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Teachers</h2>
        <Link
          href="/teachers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {teachers.map((t) => (
          <TeacherCard
            key={t.id}
            teacher={t}
            onDelete={() => deleteTeacher(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
