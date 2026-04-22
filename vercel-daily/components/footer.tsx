import { Suspense } from "react";
import CopyrightDate from "./copyright-date";

export default function Footer() {
  return (
    <footer className="bg-white text-black dark:bg-black dark:text-white border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container flex justify-between items-center">
         <p>&copy; <Suspense><CopyrightDate /></Suspense> Vercel Daily. All rights reserved.</p> 
      </div>
    </footer>
  );
}