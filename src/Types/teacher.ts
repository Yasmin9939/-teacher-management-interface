export interface AttendanceRecord {
  date: string;     // YYYY-MM-DD
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