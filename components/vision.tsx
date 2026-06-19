"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Vision() {
    const ref = useRef<HTMLElement>(null);

    // หัวข้อ + ย่อหน้าค่อยๆ โผล่แบบ stagger ตอน scroll เข้ามา
    useLayoutEffect(() => {
        if (!ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".vision-item", {
                y: 40,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.15,
                scrollTrigger: { trigger: ref.current, start: "top 80%" },
            });
        }, ref);
        return () => mm.revert();
    }, []);

    return (
        <section ref={ref} id="vision" className="bg-white py-24 md:py-40 lg:py-54 px-6 md:px-12 lg:px-48 w-full flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Title Section */}
            <div className="vision-item flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                <h2 className="text-xl font-medium text-black tracking-wide">วิสัยทัศน์</h2>
            </div>

            {/* Content Section */}
            <div className="vision-item max-w-2xl flex flex-col gap-10">
                <p className="text-xl md:text-4xl text-black font-light leading-relaxed">
                    บริษัทมีเป้าหมายที่จะพัฒนาธุรกิจอย่างต่อเนื่อง
                    โดยอาศัยประสบการณ์กว่า 30
                    ปีในการดำเนินธุรกิจเพื่อสร้างอนาคตที่ดีกว่าสำหรับคนรุ่นต่อไป
                    TAP มุ่งเน้นการให้บริการที่ตอบโจทย์ลูกค้า
                </p>

                {/* <button className="dis w-fit px-8 py-3 rounded-full bg-black text-white hover:bg-gray-50 hover:text-black transition-colors text-base">
                    เพิ่มเติม
                </button> */}
            </div>
        </section>
    );
}