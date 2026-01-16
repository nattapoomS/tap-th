"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const logoOuterRef = useRef<HTMLDivElement>(null);
    const logoInnerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Initial state: Inner logo hidden, width 0
            gsap.set(logoInnerRef.current, {
                width: 0,
                opacity: 0,
                marginLeft: 0,
                marginRight: 0
            });

            // Timeline linked to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "27% top",
                    end: "28% top", // Animate over first 200px of scroll
                    scrub: 2,
                    markers: true,
                }
            });

            // Animation:
            // 1. Fade out & slide out outer logo
            // 2. Expand & fade in inner logo

            tl.to(logoOuterRef.current, {
                x: 20, // Move slightly right towards pill
                opacity: 0,
                scale: 0.8,
                duration: 1
            })
                .to(logoInnerRef.current, {
                    width: "auto", // Expand width to fit logo
                    opacity: 1,
                    marginLeft: 20, // Add spacing
                    marginRight: 20, // Add spacing
                    duration: 1
                }, "<"); // Run simultaneously

        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 font-kanit pointer-events-none">
            {/* Logo Area (Outer) */}
            <div ref={logoOuterRef} className="flex items-center pointer-events-auto">
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
            <div className="hidden md:flex items-center bg-zinc-500/50 backdrop-blur-md rounded-2xl px-2 py-2 border border-white/5 pointer-events-auto">
                {/* Logo Area (Inner) - Hidden initially */}
                <div ref={logoInnerRef} className="relative h-8 w-0 overflow-hidden">
                    <div className="relative h-full w-24"> {/* Fixed width container for inner logo */}
                        <Image
                            src="/logo.svg"
                            alt="TAP Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="flex items-center gap-12 px-8">
                    <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">เทคโนโลยี</Link>
                    <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">การผลิต</Link>
                    <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">บริษัท</Link>
                    <Link href="#" className="text-white text-x font-light hover:text-gray-300 transition-colors">นักลงทุน</Link>
                </div>

                <Link href="#" className="bg-white text-black text-x font-light px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors ml-2">
                    ติดต่อ
                </Link>
            </div>
        </nav>
    );
}
