import VercelLogo from "@/lib/logos/vercel-logo";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import SubscribeButton from "./subscribe-button";
export default function Header() {

  return (
    <header className="p-4 bg-black text-white dark:bg-white dark:text-black sticky top-0 z-50 border-b border-gray-800 dark:border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        
          <Link href="/" className="flex items-center gap-4 flex-grow" >
            <VercelLogo className="fill-white dark:fill-black max-h-8"/>  
            <span className="text-xl font-bold">Vercel Daily</span>
        </Link>        
        <div className="flex items-center gap-4">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/search" className="nav-link">Search</Link>          
          <Suspense fallback={<div className="w-32 h-10 bg-gray-300 rounded animate-pulse" />}>
            <SubscribeButton />
          </Suspense>
        </div>
        
      </div>
     
    </header>
  );
}