import VercelLogo from "@/lib/logos/vercel-logo";
import Link from "next/link";
import { Suspense } from "react";
import SubscribeButton from "@/components/subscriptions/subscribe-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function Header() {

  return (
    <header className="p-4 bg-black text-white dark:bg-white dark:text-black sticky top-0 z-50 border-b border-gray-800 dark:border-gray-200">
      <div className="container mx-auto flex justify-between items-center">        
          <Link href="/" className="flex items-center gap-2 md:gap-4 flex-grow" >
            <VercelLogo className="fill-white dark:fill-black md:max-h-8 max-h-6"/>  
            <span className="md:text-xl text-sm font-bold">Vercel Daily</span>
        </Link>        
        <div className="flex items-center gap-4">
          <Link href="/" className="nav-link">
            <FontAwesomeIcon icon={faHouse} className="text-lg inline md:hidden" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link href="/search" prefetch={false} className="nav-link">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg inline md:hidden" />
            <span className="hidden md:inline">Search</span>
          </Link>          
          <Suspense fallback={<div className="w-32 h-10 bg-gray-300 rounded animate-pulse" />}>
            <SubscribeButton variant="header"/>
          </Suspense>
        </div>
        
      </div>
     
    </header>
  );
}