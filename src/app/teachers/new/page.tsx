'use client';
import { useRouter } from 'next/navigation';
import TeacherForm from '@/Components/TeacherForm';
import { useTeachers } from '@/lib/TeacherContext';

export default function AddTeacherPage() {
  const { addTeacher } = useTeachers();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Add New Teacher
        </h2>
        <TeacherForm
          onAdd={(data) => {
            addTeacher({ ...data, attendance: [] });
            router.push('/teachers');
          }}
        />
      </div>
    </div>
  );
}
