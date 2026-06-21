"use client";

import Image from "next/image";
import profileImage from "@/app/img/image 13.png";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Captions() {
    const quoteRef = useRef<HTMLQuoteElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!quoteRef.current) return;

        const ctx = gsap.context(() => {
            // Get all word elements
            const words = quoteRef.current?.querySelectorAll('.word');

            if (!words || words.length === 0) return;

            // Animate each word
            gsap.fromTo(
                words,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: "top 80%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, quoteRef);

        return () => ctx.revert();
    }, []);

    const quoteText = [
        '"',
        'โลกจะเปลี่ยนไป',
        'เพราะตัวอย่าง',
        'ของคุณ',
        'ไม่ใช่เพราะความคิด',
        'เห็นของคุณ',
        '"'
    ];

    return (
        <section id="captions" className="w-full min-h-screen flex items-center justify-center p-5 bg-[#F4F5F6]">
            {/* Bento Grid Container - Full Width */}
            <div className="w-full  h-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Bento Box - Quote */}
                <div className="p-2 md:p-2 lg:p-2 flex flex-col justify-center ">
                    <span className="text-orange-500 pl-0 lg:pl-20 text-xl font-medium mb-8">วิธีคิด</span>
                    <blockquote
                        ref={quoteRef}
                        className="text-2xl sm:text-3xl pl-0 lg:pl-20 md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-neutral-800"
                    >
                        {quoteText.map((text, index) => {
                            const isQuote = text.includes('"');
                            return (
                                <span key={index}>
                                    <span
                                        className={`word inline-block ${isQuote ? 'text-neutral-400' : ''}`}
                                        style={{ whiteSpace: 'pre' }}
                                    >
                                        {text}
                                    </span>
                                    {index < quoteText.length - 1 && index > 0 && index < quoteText.length - 1 && <br />}
                                    {index < quoteText.length - 1 && ' '}
                                </span>
                            );
                        })}
                    </blockquote>
                </div>

                {/* Right Bento Box - Profile Image */}
                <div className="bg-[#000000]/20 rounded-[48px] p-8 flex items-center justify-center shadow-sm overflow-hidden">
                    <div className="relative w-full h-full max-w-[800px] max-h-[800px] aspect-square rounded-full overflow-hidden">
                        <Image
                            src={profileImage}
                            alt="Profile"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
