import { useState } from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between">
          <div className="text-yellow-400 font-bold text-xl">
            📝 Notes App
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/">
              <a className="text-white hover:text-yellow-400">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-white hover:text-yellow-400">About</a>
            </Link>
            <Link href="/contact">
              <a className="text-white hover:text-yellow-400">Contact</a>
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-4">
            <Link href="/">
              <a className="text-white hover:text-yellow-400">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-white hover:text-yellow-400">About</a>
            </Link>
            <Link href="/contact">
              <a className="text-white hover:text-yellow-400">Contact</a>
            </Link>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="mt-20 p-5 sm:px-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
