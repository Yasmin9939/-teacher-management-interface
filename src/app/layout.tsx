import '../styles/globals.css';
import { ReactNode } from 'react';
import { TeacherProvider } from '../lib/TeacherContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-blue-50">  
        <TeacherProvider>
          <header className="bg-red-500 shadow p-4 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white">
              Teacher Management
            </h1>
          </header>
          <main className="mt-6 px-6">{children}</main>
        </TeacherProvider>
      </body>
    </html>
  );
}
