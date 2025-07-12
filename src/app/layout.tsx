import '../styles/globals.css'
import { ReactNode } from 'react';
import { TeacherProvider } from '../lib/TeacherContext';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = { title: 'Teacher Manager', description: '' };
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-blue-50">
        <TeacherProvider>
          <header className="bg-red-400">
            <h1 className="text-2xl font-bold text-white h-[100px] text-center content-center">
              Teacher Management
            </h1>
          </header>
          <main className="m-10">
            {children}
          </main>
        </TeacherProvider>
      </body>
    </html>
  );
}