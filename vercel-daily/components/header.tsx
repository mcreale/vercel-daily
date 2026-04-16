import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="p-4 bg-black text-white dark:bg-white dark:text-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
        <Image src="/vercel.svg" alt="Vercel Daily" width={50} height={50} className="dark:fill-black" />
        <span className="text-xl font-bold">Vercel Daily</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/search" className="nav-link">Search</Link>
        </div>
      </div>
     
    </header>
  );
}