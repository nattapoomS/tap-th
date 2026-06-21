"use client";

import Image from "next/image";
import groupPhoto from "@/app/img/Group 3.png";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";

export default function Exp() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {

            // ...existing code...
            let mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                gsap.fromTo(
                    imageRef.current,
                    {
                        x: -1200,
                        duration: 5,
                    },
                    {
                        x: 0,
                        ease: "none", // Linear for scrub
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 60%", // Start animation when container hits 80% viewport
                            end: "0 0", // Finish when center hits center
                            scrub: 2, // Smooth scrub
                        },
                    }
                );

                gsap.fromTo(
                    imageRef.current,
                    {
                        clipPath: "inset(0 50% 0 0 round 64px)", // Shows only left 50% with radius
                    },
                    {
                        clipPath: "inset(0 2.1% 0 0 round 64px)", // Shows 100% without radius
                        ease: "circ.out", // Linear for scrub
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "5% 0", // Start animation when container hits 80% viewport
                            end: "95% 0", // Finish when center hits center
                            scrub: 1, // Smooth scrub
                            pin: true,
                        },
                    }
                );

                // Text animation: Right to Left (100px) synced with clipPath
                gsap.fromTo(textRef.current,
                    {
                        x: -300,
                        opacity: 1,
                        ease: "circ.out",
                    },
                    {
                        x: 850,
                        opacity: 0,
                        ease: "power1.in",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "-45% top",   // Sync with clipPath
                            end: "25% 0",    // Sync with clipPath
                            scrub: 1,
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen lg:h-screen overflow-hidden border-0 flex flex-col-reverse lg:block bg-white">
            {/* Static Background Layer */}
            <div className="absolute inset-0 w-full h-full z-[-1]" />

            {/* Image Layer */}
            <div ref={imageRef} className="relative w-full h-[45vh] lg:absolute lg:inset-y-0 lg:top-5 lg:bottom-5 lg:left-5 lg:right-5 lg:h-auto z-0 rounded-none lg:rounded-[64px] overflow-hidden shrink-0">
                <Image
                    src={groupPhoto}
                    alt="TAP Team"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full lg:h-full flex flex-col -ml-10 lg:flex-row grow lg:mt-0">
                <div className="hidden lg:block lg:w-1/2" /> {/* Spacer for left side */}

                <div ref={textRef} className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-4 pt-20 pb-8 lg:p-0 lg:pr-40">

                    {/* Text Card (Mobile only style, Desktop transparent) */}
                    <div className="w-full bg-transparent lg:bg-transparent shadow-none lg:shadow-none p-0 flex flex-col items-center">
                        <div className="flex items-center justify-center gap-3 mb-6 ">

                            <span className="text-3xl text-black font-medium tracking-wide">A better way to ride</span>
                        </div>

                        <h3 className="text-3xl text-black text-center leading-relaxed">
                            ใช้เวลาของคุณกับสิ่งที่คุณสนใจและให้ Tap
                            <br className="hidden md:block" />
                            จัดการการงานในขณะที่คุณเพลิดเพลินกับการขับขี่ที่ราบรื่น
                            <br className="hidden md:block" />
                            ในห้องโดยสารที่กว้างขวาง
                        </h3>
                    </div>

                </div>
            </div>
        </section>
    );
}