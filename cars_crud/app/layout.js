"use client";
import './globals.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import ThemeWrapper from './context/theme';
import AuthWrapper from './context/Auth';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col dark:bg-black">
        <ThemeWrapper>
        <AuthWrapper>
          <Header />
          <main className="flex-grow dark:bg-black">
            {children}
          </main>
          <Footer />
          </AuthWrapper>
        </ThemeWrapper>
      </body>
    </html>
  );
}
