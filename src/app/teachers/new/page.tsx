'use client';

import { useRouter } from 'next/navigation';
import TeacherForm from '../../../Components/TeacherForm';
import { useTeachers } from '../../../lib/TeacherContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddTeacherPage() {
  const { addTeacher } = useTeachers();
  const router = useRouter();

  return (
    <div className="h-[100%] bg-gradient-to-br from-blue-50 to-white py-12 px-4 w-full">
      <div className="mx-auto h-[100%] bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-blue-700">Add New Teacher</h2>
          <Link
            href="/teachers"
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Teachers
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          Fill in the form below to register a new teacher. All fields are required.
        </p>

        <div className="w-[100%] my-[20px]">
          <TeacherForm
            onAdd={(data) => {
              addTeacher({ ...data, attendance: [] });
              router.push('/teachers');
            }}
          />
        </div>
      </div>
    </div>
  );
}
