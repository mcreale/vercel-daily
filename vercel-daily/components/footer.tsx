'use client';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white text-black dark:bg-black dark:text-white border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container flex justify-between items-center">
         <p>&copy; {currentYear} Vercel Daily. All rights reserved.</p> 
      </div>
    </footer>
  );
}