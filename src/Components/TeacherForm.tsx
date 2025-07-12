'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Subject is required'),
  upi: z.string().min(1, 'UPI is required'),
  salary: z.number().min(0, 'Salary must be positive'),
  attendance: z.number().min(0, 'Attendance must be positive'),
});

type FormData = z.infer<typeof schema>;

export default function TeacherForm({ onAdd }: { onAdd: (data: FormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submit = (data: FormData) => {
    onAdd(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=""
    >
      <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
        Add Teacher Details
      </h2>

    <div className="flex flex-col gap-4 m-[40px] p-[20px]">

      <div>
        <input
          {...register('name')}
          placeholder="Full Name"
          className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('email')}
          placeholder="Email Address"
          className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('subject')}
          placeholder="Subject"
          className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <input
          {...register('upi')}
          placeholder="UPI ID"
          className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.upi && <p className="text-red-500 text-sm mt-1">{errors.upi.message}</p>}
      </div>

      <div>
        <input
          type="number"
          {...register('attendance', { valueAsNumber: true })}
          placeholder="Attendance (in days)"
          className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.attendance && (
          <p className="text-red-500 text-sm mt-1">{errors.attendance.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register('salary', { valueAsNumber: true })}
          placeholder="Monthly Salary (₹)"
          className="w-full border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
      </div>
    </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        {isSubmitting ? 'Adding...' : 'Add Teacher'}
      </button>
    </form>
  );
}
