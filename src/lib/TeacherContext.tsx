'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Teacher, AttendanceRecord } from '../Types/teacher';

interface TeacherContextValue {
  teachers: Teacher[];
  addTeacher: (t: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, data: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  recordAttendance: (date: string, id: string, present: boolean) => void;
}

const TeacherContext = createContext<TeacherContextValue | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('teachers');
    if (saved) setTeachers(JSON.parse(saved));
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);

  const addTeacher = (data: Omit<Teacher, 'id'>) => {
    const newT = { ...data, id: crypto.randomUUID(), salary: data.salary ?? 0, attendance: data.attendance ?? [] };
    setTeachers(t => [...t, newT]);
  };

  const updateTeacher = (id: string, data: Partial<Teacher>) => {
    setTeachers(t => t.map(x => x.id === id ? { ...x, ...data } : x));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(t => t.filter(x => x.id !== id));
  };

  const recordAttendance = (date: string, id: string, present: boolean) => {
    setTeachers(t => t.map(x => {
      if (x.id !== id) return x;
      const updated: AttendanceRecord[] = x.attendance.filter(a => a.date !== date);
      updated.push({ date, present });
      return { ...x, attendance: updated };
    }));
  };

  return (
    <TeacherContext.Provider value={{ teachers, addTeacher, updateTeacher, deleteTeacher, recordAttendance }}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeachers() {
  const ctx = useContext(TeacherContext);
  if (!ctx) throw new Error('useTeachers must be inside TeacherProvider');
  return ctx;
}