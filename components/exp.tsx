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

            gsap.fromTo(
                imageRef.current,
                {
                    x: -1200,
                    duration: 3,
                },
                {
                    x: 0,
                    ease: "none", // Linear for scrub
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%", // Start animation when container hits 80% viewport
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
                    clipPath: "inset(0 0% 0 0 round 64px)", // Shows 100% without radius
                    ease: "none", // Linear for scrub
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top", // Start animation when container hits 80% viewport
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
                    ease: "power1.out",
                },
                {
                    x: 850,
                    opacity: 1,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "-15% top",   // Sync with clipPath
                        end: "center 0",    // Sync with clipPath
                        scrub: 3,           // Sync speed

                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-[99vw] h-screen overflow-hidden border-0 ">
            {/* Static Background Layer - Does NOT move with GSAP */}
            <div className="absolute inset-0 w-full h-full z-[-1] bg-neutral-100" />

            {/* Image Layer - Absolute and Full Screen */}
            <div ref={imageRef} className="absolute inset-y-0 top-5 bottom-5  left-5 right-5 z-0 rounded-[64px] overflow-hidden">
                <Image
                    src={groupPhoto}
                    alt="TAP Team"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Layer - Positioned Right */}
            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
                <div className="hidden lg:block lg:w-1/2" /> {/* Spacer for left side */}

                <div ref={textRef} className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-24 xl:px-32">
                    <div className="flex items-center gap-3 mb-6 ">
                        <ChevronRight className="w-6 h-6 text-black stroke-3" />
                        {/* Added drop-shadow to handle text readability over image */}
                        <span className="text-lg text-black font-medium tracking-wide drop-shadow-md">A better way to ride</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-black drop-shadow-md">
                        ใช้เวลาของคุณกับสิ่งที่คุณสนใจและให้ Tap
                        จัดการการจราจรในขณะที่คุณเพลิดเพลินกับการขับขี่ที่ราบรื่น
                        <br className="hidden lg:block" />
                        ในห้องโดยสารที่กว้างขวาง
                    </h3>
                </div>
            </div>
        </section>
    );
}