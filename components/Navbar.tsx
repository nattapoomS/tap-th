import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 font-kanit">
            {/* Logo Area */}
            <div className="flex items-center">
                <div className="relative h-12 w-40">
                    <Image
                        src="/logo.svg"
                        alt="TAP Logo"
                        fill
                        className="object-contain" // Use object-contain to keep aspect ratio
                        priority
                    />
                </div>
            </div>

            {/* Navigation Links and Contact Button - Pill Container */}
            <div className="hidden md:flex items-center bg-zinc-500/50 backdrop-blur-md rounded-2xl px-10 pr-2 py-1 gap-12 border border-white/5">
                <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">เทคโนโลยี</Link>
                <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">การผลิต</Link>
                <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">บริษัท</Link>
                <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">นักลงทุน</Link>

                <Link href="#" className="bg-white text-black text-x font-light px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    ติดต่อ
                </Link>
            </div>
        </nav>
    );
}
