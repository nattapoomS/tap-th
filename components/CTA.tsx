"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTA() {
    const ref = useRef<HTMLDivElement>(null);

    // เนื้อหาค่อยๆ โผล่แบบ stagger ตอน scroll เข้ามา
    useLayoutEffect(() => {
        if (!ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".cta-item", {
                y: 40,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.12,
                scrollTrigger: { trigger: ref.current, start: "top 80%" },
            });
        }, ref); // scope selector ให้ ref (ไม่ซ้อน gsap.context ใน matchMedia)
        return () => mm.revert();
    }, []);

    return (
        <section ref={ref} id="cta" className="relative overflow-hidden bg-linear-to-b from-white via-pink-100 to-pink-200 py-24 lg:py-32">
            {/* Large Watermark Text */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                <h2 className="text-[20rem] lg:text-[28rem] font-bold text-gray-200/30 leading-none select-none pointer-events-none whitespace-nowrap">

                </h2>
            </div>

            {/* Content Container */}
            <div className="relative  z-10 container mx-auto px-6 lg:px-10">
                {/* Demo Tag */}
                <div className="cta-item mb-8">
                    <span className="inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                        <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                        ขอใบเสนอราคาฟรี
                    </span>
                </div>

                {/* Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-40">
                    {/* Left Side - Heading */}
                    <div>
                        <h2 className="cta-item text-4xl md:text-5xl lg:text-6xl xl:text-7xl  leading-tight text-gray-900">
                            พร้อมยกระดับ
                            <br />
                            งานบดคอนกรีต
                            <br />
                            ของคุณแล้วหรือยัง?
                        </h2>
                    </div>

                    {/* Right Side - Description & Button */}
                    <div className="flex md:pl-29  flex-col gap-8 lg:pt-4">
                        <p className="cta-item text-gray-600 leading-relaxed max-w-md">
                            เครื่องบด Crusher ของเราพร้อมรองรับทุกงานรื้อถอนและรีไซเคิลคอนกรีต
                            ด้วยกำลังการผลิตสูงสุด 500 ตัน/ชม. ประหยัดต้นทุนได้ถึง 40%
                            พร้อมทีมผู้เชี่ยวชาญให้คำปรึกษาตลอด 24 ชม.
                        </p>

                        <div className="cta-item">
                            <button className="group bg-black hover:bg-gray-800 text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                ติดต่อเราวันนี้
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
