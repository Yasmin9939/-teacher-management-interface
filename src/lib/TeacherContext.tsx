'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface AttendanceRecord {
  date: string;
  present: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  upi: string;
  salary: number;
  attendance: AttendanceRecord[];
}

interface PaymentRecord {
  paidAmount: number; // total amount paid so far
}

interface TeacherContextValue {
  teachers: Teacher[];
  addTeacher: (t: Omit<Teacher, 'id'>) => void;
  deleteTeacher: (id: string) => void;
  recordAttendance: (date: string, id: string, present: boolean) => void;
  payTeacher: (id: string) => void;
  getPaymentRecord: (id: string) => PaymentRecord;
}

const TeacherContext = createContext<TeacherContextValue | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [payments, setPayments] = useState<Record<string, PaymentRecord>>({});

  // Load from localStorage
  useEffect(() => {
    const t = localStorage.getItem('teachers');
    const p = localStorage.getItem('payments');
    if (t) setTeachers(JSON.parse(t));
    if (p) setPayments(JSON.parse(p));
  }, []);

  // Persist teachers & payments
  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);
  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  const addTeacher = (data: Omit<Teacher, 'id'>) => {
    const newT: Teacher = {
      ...data,
      id: crypto.randomUUID(),
      attendance: data.attendance || [],
    };
    setTeachers((prev) => [...prev, newT]);
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    setPayments((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const recordAttendance = (date: string, id: string, present: boolean) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const others = t.attendance.filter((a) => a.date !== date);
        return { ...t, attendance: [...others, { date, present }] };
      })
    );
    // **Do NOT reset payments** here—keep prior payments
  };

  const payTeacher = (id: string) => {
    const teacher = teachers.find((t) => t.id === id);
    if (!teacher) return;
    const presentDays = teacher.attendance.filter((a) => a.present).length;
    const due = Math.floor((presentDays / 30) * teacher.salary);

    setPayments((prev) => {
      const prevPaid = prev[id]?.paidAmount || 0;
      const pending = due - prevPaid;
      if (pending <= 0) return prev; // nothing left to pay
      return {
        ...prev,
        [id]: { paidAmount: prevPaid + pending },
      };
    });
  };

  const getPaymentRecord = (id: string): PaymentRecord => {
    return payments[id] || { paidAmount: 0 };
  };

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        addTeacher,
        deleteTeacher,
        recordAttendance,
        payTeacher,
        getPaymentRecord,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeachers() {
  const ctx = useContext(TeacherContext);
  if (!ctx) throw new Error('useTeachers must be used within TeacherProvider');
  return ctx;
}
