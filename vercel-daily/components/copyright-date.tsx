'use client';
 export default function CopyrightDate() {
   const currentYear = new Date().getFullYear();
   return (
     <>{currentYear}</>
   );
 }